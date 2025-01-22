<script setup>
import { usePostStore } from '~/stores/MemberContent/post';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { useBookmarkStore } from '~/stores/MemberContent/bookmark';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const name = route.params.paperTypeName;
const memberAuthStore = useMemberAuthStore();
const bookmarkStore = useBookmarkStore(); 
const guestModal = ref(false);

async function modal() {
  
  guestModal.value = true; // Tampilkan moda
  
};
const closeModal = () => {
  guestModal.value = false;
};

onMounted(() => {
  postStore.getPaper(name);
  memberAuthStore.getUserProfile();
  postStore.showPostDetail();
  postStore.getPost();
  

});
const createdLike = async (slug) => {
    await postStore.createLike(slug);
    const post = postStore.papers.find(post => post.slug === slug);
    if (post) {
        post.like = true; // Update bookmark status
        post.likes_count = post.likes_count + 1
    }
    
};

const deletedLike = async (slug) => {
    await postStore.deleteLike(slug);
    const post = postStore.papers.find(post => post.slug === slug);
    if (post) {
        post.like = false; // Update bookmark status
        post.likes_count = post.likes_count - 1;
    }
   
};

const createdBoomark = async (postId) => {
    await bookmarkStore.create(postId);
    const post = postStore.papers.find((post) => post.id === postId);
    if (post) {
        post.bookmark = true; // Update bookmark status
    }
};

const deletedBoomark = async (postId) => {
    await bookmarkStore.delete(postId);
    const post = postStore.papers.find((post) => post.id === postId);
    if (post) {
        post.bookmark = false; // Update bookmark status
    }
};

</script>

<template>
    <div class="container" style="padding-left: 98px; padding-right: 98px;">

      <div class="row justify-content-center pt-5">
        
      </div>
      
        <div class="d-flex row row-cols-5 gap-5 pt-5 pb-5" v-if="postStore.papers.length">


          <router-link :to="`/member/detailpost/${paper.slug}`" class="text-decoration-none text-black" v-for="paper in postStore.papers" :key="paper.name" v-if="memberAuthStore.userProfile?.role ==='member'">
          <div class="card col "  style="width: 250px; height: 400px;" >
           
                <div class="col position-relative pb-4 pt-2" >
                  <span class="position-absolute end-0 border-0 pe-3">
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;" @click.prevent="createdBoomark(paper?.id)" v-if="!paper.bookmark">
                      <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;" @click.prevent="deletedBoomark(paper?.id)" v-else>
                      <img src="/public/images/Bookmark2.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                  </span>
                </div>
                <div class="col mx-auto pt-2">
                    <img src="/public/images/dokumen1.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/public/images/dokumen1.svg">
                </div>
                <div class="card-body position-relative">
                    <ul class="list-unstyled pt-3">
                        <li><small>{{ paper.papertype.name }}</small></li>  
                        <li class="pt-2"><h5>{{ paper.title }}</h5></li>
                        <li><small>Published by {{ paper.user?.username }}</small></li>  
                        <li class="card-foote">
                          <span class="position-absolute bottom-0 start-0 ps-2 pb-2" v-if="!paper?.like">
                              <small @click.prevent="createdLike(paper.slug)"><img src="/public/images/heart.svg" alt="" class="icon-love"></small>
                              <small class="pt-1">{{ paper.likes_count }} Likes</small>
                          </span>
                          <span class="position-absolute bottom-0 start-0 ps-2 pb-2" v-else>
                              <small @click.prevent="deletedLike(paper.slug)"><img src="/public/images/heart-fill.svg" class="icon-love-filled ms-2"></small>
                              <small class="pt-1">{{ paper.likes_count }} Likes</small>
                          </span>
                        </li>
                    </ul>
                </div>
            
              
          </div>
        </router-link>

        <router-link v-for="papers in postStore.papers" :key="papers.name" style="width: 250px; height: 400px;" v-else class="text-decoration-none text-dark">
          
          <div class="card col"  @click="modal" data-bs-toggle="guestModal" data-bs-target="#guestModal" style="outline: transparent;">
                
                <div class="col position-relative pb-4 pt-2">
                  <span class="position-absolute end-0 border-0 pe-3">
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;">
                      <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                    </button>
                  </span>
                </div>
                <div class="col mx-auto pt-2">
                    <img src="/public/images/dokumen1.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/public/images/dokumen1.svg">
                </div>
                <div class="card-body position-relative">
                    <ul class="list-unstyled pt-3">
                        <li><small>{{ papers.papertype.name }}</small></li>  
                        <li class="pt-2"><h5>{{ papers.title }}</h5></li>
                        <li><small>Published by {{ papers.user?.username }}</small></li>  
                        <li class="card-foote">
                            <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                                <small><img src="/public/images/heart.svg" alt=""></small>
                                <small class="pt-1">{{ papers.likes_count }} Likes</small>
                            </span>
                        </li>
                    </ul>
                    
                </div>
           
          
              
          </div>
        </router-link>
      </div>
      <div class="d-flex row pt-5 pb-5 text-center" v-else>
          <h2>No Post Found</h2>
      </div>
    </div>


<div v-if="guestModal" id="guestModal" class="modal fade show d-block" aria-labelledby="guestModal" aria-hidden="true" tabindex="-1"> 
  <div class="preview-page d-flex justify-content-center align-items-center vh-100">
      <div class="container p-5 rounded shadow-lg bg-light">
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

<style lang="scss" scoped>

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

</style>