<script setup>
import { onMounted } from 'vue';
import { definePageMeta } from '#build/imports';
import { usePostStore } from '~/stores/MemberContent/post';
import { useBookmarkStore } from '~/stores/MemberContent/bookmark';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

definePageMeta({
  middleware : 'member-auth',
});

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const bookmarkStore = useBookmarkStore();
const keyword = ref('');
const member = useMemberAuthStore();
const startIndexLikes = ref(0);


onMounted(() => {
  if (route.name === 'member-home') {
    postStore.keyword = '';
  }
});

onMounted(async () => { 
  if (!member.isLogin) {
    router.push('/');
  }
  else{
    await postStore.getPost();
    postStore.posts
    if (route.query.keyword) {
      postStore.keyword = route.query.keyword;  
      await postStore.getPost();
    } else {
      router.push('/member/home');
    } 
  }
});

const onKeywordChange = async () => { 
  router.push({ 
    path: '/member/post', 
    query: { keyword: postStore.keyword } 
  }); 
  await postStore.getPost();
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/member/home') {
      postStore.keyword = '';
    }
  }
);

const createdBoomark = async (postId) => {
    await bookmarkStore.create(postId);
    const post = postStore.posts.find(post => post.id === postId);
    post.bookmark = true;
};

const deletedBoomark = async (postId) => {
    await bookmarkStore.delete(postId);
    const post = postStore.posts.find(post => post.id === postId);
    post.bookmark = false;
};

const createdLike = async (slug) => {
    await postStore.createLike(slug);
    const post = postStore.posts.find(post => post.slug === slug);
    post.like = true;
    post.likes_count = post.likes_count + 1;
};

const deletedLike = async (slug) => {
    await postStore.deleteLike(slug);
    const post = postStore.posts.find(post => post.slug === slug);
    post.like = false;
    post.likes_count = post.likes_count - 1;
};

const startIndex = ref(0);
const postsPerPage = 3;

const currentPosts = computed(() => {
  return postStore.posts.slice(startIndex.value, startIndex.value + postsPerPage);
});

const sortedPostsByLikes = computed(() => {
  if (!postStore.posts || !Array.isArray(postStore.posts)) {
    return [];
  }
  return [...postStore.posts].sort((a, b) => b.likes_count - a.likes_count);
});

const currentLikedPosts = computed(() => {
  if (!Array.isArray(sortedPostsByLikes.value)) {
    return [];
  }
  return sortedPostsByLikes.value.slice(startIndexLikes.value, startIndexLikes.value + postsPerPage);
});


const prevSlide = () => {
  if (startIndex.value > 0) {
    startIndex.value -= 1;
  }
};

const nextSlide = () => {
  if (startIndex.value + postsPerPage < postStore.posts.length) {
    startIndex.value += 1;
  }
};

const createdHistory = async (slug) => {
    await postStore.createHistory(slug);
};

const truncateTitle = (title) => {
  return title.length > 10 ? title.substring(0, 10) + '...' : title;
};

</script>

<template>
  <div class="container-fluid overflow-x-hidden">
    <div class="row">
      <SideBar/>
      <div class="col-md-9">
        <div class="mb-3 p-5">
          <input type="text" class="form-control" placeholder="Search for documents..." v-model="postStore.keyword" @keyup.enter="onKeywordChange" />
        </div>

        <div class="row">
            <div class="col-6 ms-5"><h5 class="pink-header">Latest Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <NuxtLink to="/member/post" class="view-more text-decoration-none">View More</NuxtLink>
            </div>
        </div>

        <section class="p-5" v-if="postStore.posts.length > 0">
          <div class="d-flex align-items-center justify-content-center pt-3 pb-5">
            <button
              @click="prevSlide"
              class="btn btn-secondary me-3"
              :disabled="startIndex === 0"
            >
              &lt;
            </button>

            <div class="row" style="gap: 30px; overflow: hidden;">
              <router-link
                v-for="(post) in currentPosts"
                :to="`/member/detailpost/${post.slug}`"
                class="col-auto text-decoration-none"
                @click ="createdHistory(post.slug)"
                >
                <div class="col-auto">
                  <div class="document-card">
                    <div class="card-header text-center">
                      <a class="btn" style="border: 1px solid black;
                                            width: 52px;
                                            height: 53px;
                                            border-radius: 100%;
                                            margin-left: 75%;
                                            box-shadow: 0px 0px 4px 0px;
                                            opacity: 70%;
                                            position: relative;" 
                                            @click.prevent="createdBoomark(post.id)"
                                            v-if="!post.bookmark">
                        <img src="/images/bookmark.svg" alt="Bookmark" class="icon-bookmark" />
                      </a>
                      <a class="btn" style="border: 1px solid black;
                                            width: 52px;
                                            height: 53px;
                                            border-radius: 100%;
                                            margin-left: 75%;
                                            box-shadow: 0px 0px 4px 0px;
                                            opacity: 70%;
                                            position: relative;" 
                                            @click.prevent="deletedBoomark(post.id)" v-else>
                        <img src="/public/images/bookmark-fill.svg" alt="Bookmark" class="icon-bookmark" />
                      </a>
                      <img src="/public/images/dokumen1.svg" alt="Document" class="document-img my-4" />
                    </div>
                    <div class="container-fluid">
                        <p class="document-category">{{ post.category.name }}</p>
                        <h1 class="document-title">{{ truncateTitle(post.title) }}</h1>
                        <p class="document-publisher">Published by {{ post.user.username }}</p>
                    </div>
                    <div class="card-footer">
                      <a class="" @click.prevent="createdLike(post.slug)" v-if="!post.like">
                        <img src="/public/images/heart.svg" alt="Love" class="icon-love" />
                      </a>
                      <a class="" @click.prevent="deletedLike(post.slug)" v-else>
                        <img src="/public/images/heart-fill.svg" alt="Love" class="icon-love-filled ms-2" />
                      </a>
                      <span class="likes-count">{{ post.likes_count }} Likes</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          
            <button
              @click="nextSlide"
              class="btn btn-secondary ms-3"
              :disabled="startIndex + postsPerPage >= postStore.posts.length">
              &gt;
            </button>
          </div>
        </section>
        <section v-else>
          <div class="d-flex align-items-center justify-content-center">
            <p>No Post Available Yet</p>
          </div>
        </section>
        
        <div class="row">
            <div class="col-6 ms-5"><h5 class="pink-header">Most Liked Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <NuxtLink to="/member/popular" href="#" class="view-more text-decoration-none">View More</NuxtLink>
            </div>
        </div>
        <section class="p-5" v-if="currentLikedPosts.length > 0">
          <div class="d-flex align-items-center justify-content-center pt-3 pb-5">
            <div class="row" style="gap: 30px; overflow: hidden;">
              <router-link
                v-for="(post) in currentLikedPosts"
                :to="`/member/detailpost/${post.slug}`"
                class="col-auto text-decoration-none"
              >
              <div class="col-auto">
                              <div class="document-card">
                                <div class="card-header text-center">
                                  <a class="btn" style="border: 1px solid black;
                                                        width: 52px;
                                                        height: 53px;
                                                        border-radius: 100%;
                                                        margin-left: 75%;
                                                        box-shadow: 0px 0px 4px 0px;
                                                        opacity: 70%;
                                                        position: relative;" 
                                                        @click.prevent="createdBoomark(post.id)"
                                                        v-if="!post.bookmark">
                                    <img src="/images/bookmark.svg" alt="Bookmark" class="icon-bookmark" />
                                  </a>
                                  <a class="btn" style="border: 1px solid black;
                                                        width: 52px;
                                                        height: 53px;
                                                        border-radius: 100%;
                                                        margin-left: 75%;
                                                        box-shadow: 0px 0px 4px 0px;
                                                        opacity: 70%;
                                                        position: relative;" 
                                                        @click.prevent="deletedBoomark(post.id)" v-else>
                                    <img src="/public/images/bookmark-fill.svg" alt="Bookmark" class="icon-bookmark" />
                                  </a>
                                  <img src="/public/images/File_light.svg" alt="Document" class="document-img my-4" />
                                </div>
                                <div class="container-fluid">
                                    <p class="document-category">{{ post.category.name }}</p>
                                    <h1 class="document-title">{{ truncateTitle(post.title) }}</h1>
                                    <p class="document-publisher">Published by {{ post.user.username }}</p>
                                </div>
                                <div class="card-footer">
                                  <a class="" @click.prevent="createdLike(post.slug)" v-if="!post.like">
                                    <img src="/public/images/heart.svg" alt="Love" class="icon-love" />
                                  </a>
                                  <a class="" @click.prevent="deletedLike(post.slug)" v-else>
                                    <img src="/public/images/heart-fill.svg" alt="Love" class="icon-love-filled ms-2" />
                                  </a>
                                  <span class="likes-count">{{ post.likes_count }} Likes</span>
                                </div>
                              </div>
                            </div>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
 .document-card {
    background-color: #ffffff;
    width: 265px;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  .document-img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .document-category {
    font-size: 16px;
    color: #000;
    margin-bottom: 5px;
  }
  
  .document-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  .document-publisher {
    font-size: 16px;
    color: #000000;
  }

  .document-card {
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: start;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(18, 16, 16, 0.15);
  }

  .card-header {
    position: relative;
  }

  .icon-bookmark {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .card-footer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    
    .icon-love {
      width: 40px;
      cursor: pointer;
      transition: opacity 0.3s ease;
    
      &:hover {
        opacity: 0.7;
      }
    }

    .icon-love-filled {
      width: 20px;
      margin-right: 10px;
      margin-left: 5px;
      margin-top: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: opacity 0.3s ease;
    
      &:hover {
        opacity: 0.7;
      }
    }

    .likes-count {
      font-size: 18px;
      color: #333;
    }
  }
}
</style>