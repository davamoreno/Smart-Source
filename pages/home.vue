<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '~/stores/MemberContent/post';
import DocumentCard from '~/components/DocumentCard.vue';

const postStore = usePostStore();

onMounted(() => {
  postStore.getPost();
});

definePageMeta({
  middleware : 'member-auth',
});

const startIndex = ref(0);
const postsPerPage = 3;

const currentPosts = computed(() => {
  return postStore.posts.slice(startIndex.value, startIndex.value + postsPerPage);
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
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <SideBar/>

      <div class="col-md-9">
        <div class="mb-3 p-5">
          <input type="text" class="form-control" placeholder="Search for documents..." />
        </div>

        <div class="row">
            <div class="col-6 ms-5"><h5 class="pink-header">Latest Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <a href="#" class="view-more">View More</a>
            </div>
          </div>

        <section class="px-5" v-if="postStore.posts.length > 0">
          <div class="d-flex align-items-center">
            <button
              @click="prevSlide"
              class="btn btn-secondary me-3"
              :disabled="startIndex === 0"
            >
              &lt;
            </button>
          
            <div class="row" style="gap: 30px; overflow: hidden;">
              <router-link
                v-for="(post, index) in currentPosts"
                :key="index"
                :to="`/member/detailpost/${post.id}`"
                class="col-auto text-decoration-none"
              >
                <DocumentCard
                  :title="post.title"
                  :category="post.category.name"
                  :publisher="post.user.username"
                />
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
          <div class="d-flex align-items-center">
            <P>No Post available</P>
          </div>
        </section>
                
        <section class="mt-5 px-5 pb-5">
          <div class="row">
            <div class="col-10"><h5 class="pink-header">Most Liked Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <a href="#" class="view-more">View More</a>
            </div>
          </div>
          <div class="row g-5">
            <DocumentCard
              v-for="(doc, index) in likedDocuments"
              :key="index"
              :title="doc.title"
              :category="doc.category"
              :publisher="doc.publisher"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">


</style>