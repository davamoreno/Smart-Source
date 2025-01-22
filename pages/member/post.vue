<script setup>
import { usePostStore } from '~/stores/MemberContent/post';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookmarkStore } from '~/stores/MemberContent/bookmark';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const member = useMemberAuthStore();
const guestModal = ref(false);
const bookmarkStore = useBookmarkStore();

async function modal() {
  
  guestModal.value = true; // Tampilkan moda
  
};
const closeModal = () => {
  guestModal.value = false;
};

onMounted(() => {
  member.getUserProfile();
  bookmarkStore.getBookmarks();
  postStore.getPost();
  postStore.showPostDetail();
});

onMounted(async () => { 
  if (route.query.keyword) {
    postStore.keyword = route.query.keyword;  
    await postStore.getPost();
  } else {
    console.error('Keyword Not Available'); 
    router.push('/member/home');
  } 
});

const onKeywordChange = async () => { 
  router.push({ 
    path: '/member/post', 
    query: { keyword: postStore.keyword } 
  }); 
  await postStore.getPost();
  
};


watch(() => postStore.keyword , async (newKeyword) => {
  router.push({ 
    path: '/member/post', query: { keyword: postStore.keyword } 
  });
  await postStore.getPost({ keyword: newKeyword });
});

const createdBoomark = async (postId) => {
    await bookmarkStore.create(postId);
    const post = postStore.posts.find((post) => post.id === postId);
    if (post) {
        post.bookmark = true; // Update bookmark status
    }
};

const deletedBoomark = async (postId) => {
    await bookmarkStore.delete(postId);
    const post = postStore.posts.find((post) => post.id === postId);
    if (post) {
        post.bookmark = false; // Update bookmark status
    }
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


</script>

<template>
    <div class="container" style="padding-left: 98px; padding-right: 98px;">

      <div class="row justify-content-center pt-5">
        <div class="justify-content-center w-50">
            <span class="d-flex position-relative">
                <input type="text" class="form-control border-dark rounded-4 pl-4" id="university" name="university" v-model="postStore.keyword" placeholder="Search for documents" @keyup.enter="onKeywordChange" style="padding-left: 40px;">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="main-icon position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%);" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#000000" />
                </svg>
            </span>
        </div>
      </div>


      <div class="d-flex row row-cols-5 gap-5 pt-5 pb-5">
        
        <router-link class="text-decoration-none" v-for="(post, index) in postStore.posts" :key="index" :to="`/member/detailpost/${post.slug}`" v-if="member.userProfile.role === 'member'">
          <div class="card col" style="width: 250px; height: 400px;">
                <div class="col position-relative pb-4 pt-3 me-3">
                  <span class="position-absolute end-0 border-2">
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;" @click.prevent="createdBoomark(post?.id)" v-if="!post.bookmark">
                      <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;" @click.prevent="deletedBoomark(post?.id)" v-else>
                      <img src="/public/images/Bookmark2.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                  </span>
                </div>
                <div class="col mx-auto pt-2">
                    <img src="/public/images/dokumen1.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/assets/images/kewun.svg">
                </div>
                <div class="card-body position-relative">
                    <ul class="list-unstyled pt-3">
                        <li><small>{{ post.paper_type.name }}</small></li>  
                        <li class="pt-2"><h5>{{ post.title }}</h5></li>
                        <li><small>Published by {{ post.user?.username }}</small></li>  
                        <li class="card-foote">
                            <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                              
                                <small @click.prevent="createdLike(post.slug)" v-if="!post.like"><img src="/public/images/heart.svg" alt="" class="icon-love"></small>
                                <small @click.prevent="deletedLike(post.slug)" v-else><img src="/public/images/heart-fill.svg" alt="" class="icon-love-filled ms-2"></small>
                                <small class="pt-1">{{ post.likes_count }} Likes</small>
                            </span>
                        </li>
                    </ul>
                </div>
              
          </div>
        </router-link>

        <router-link v-for="(post, index) in postStore.posts" :key="index1"  style="width: 250px; height: 400px;" v-else class="text-decoration-none text-dark">
          
          <div class="card col"  @click="modal" data-bs-toggle="guestModal" data-bs-target="#guestModal" style="outline: transparent;">
                
                <div class="col position-relative pb-4 pt-2">
                  <span class="position-absolute end-0 border-0 pe-3">
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;">
                      <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                  </span>
                </div>
                <div class="col mx-auto pt-2">
                    <img src="/public/images/dokumen1.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/assets/images/kewun.svg">
                </div>
                <div class="card-body position-relative">
                  <ul class="list-unstyled pt-3">
                        <li><small>{{ post.paper_type.name }}</small></li>  
                        <li class="pt-2"><h5>{{ post.title }}</h5></li>
                        <li><small>Published by {{ post.user?.username }}</small></li>  
                        <li class="card-foote">
                            <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                                <small><img src="/public/images/heart.svg" alt=""></small>
                                <small class="pt-1">{{ post.count_like }} Likes</small>
                            </span>
                        </li>
                    </ul>
                    
                </div>
           
          
              
          </div>
        </router-link>
        

      </div>
    </div>

    <div v-if="guestModal" id="guestModal" class="modal fade show d-block" aria-labelledby="guestModal" aria-hidden="true" tabindex="-1"> 
  <div class="preview-page d-flex justify-content-center align-items-center vh-100">
      <div class="container p-5 rounded shadow-lg bg-light" style=" width: 900px;">
        <!-- Title -->
        <h1 class="fw-bold mb-3 text-center">This just a preview</h1>
        <p class="text-muted fs-5 text-center mb-4">
          Sign In now and get access to many posts as you want
        </p>
  
        <!-- Features -->
        <div class="features d-flex justify-content-center gap-4 mb-5">
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Read to all Posts
          </p>
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Get unlimited Downloads
          </p>
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Keep your Documents
          </p>
        </div>
  
        <!-- Illustration and Buttons -->
        <div class="illustration-and-buttons d-flex justify-content-center align-items-center gap-5">
          <!-- Illustration -->
          <div class="illustration-container">
            <img
              src="public/images/reader.svg"
              alt="Reader Illustration"
              class="illustration-image"
            />
          </div>
  
          <!-- Buttons Section -->
          <div class="buttons-container d-flex flex-column align-items-start gap-3">
            <NuxtLink to="/" class="btn btn-dark w-100"
            >Sign In Now</NuxtLink>
            <button class="btn btn-outline-dark w-100" @click="closeModal">
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>


    
</template>

<style scoped>

.card-foote {
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

</style>