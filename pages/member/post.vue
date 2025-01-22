<script setup>
import { usePostStore } from '~/stores/MemberContent/post';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => { 
  if (route.query.keyword) {
    postStore.keyword = route.query.keyword; 
    await postStore.getPost();
  } else {
    route.query.keyword = null;
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

</script>

<template>
 
    <div class="container" style="padding-left: 98px; padding-right: 98px;">

      <div class="row justify-content-center pt-5">
        <div class="input-group w-50">
          <input type="text" class="form-control border-dark rounded-4" id="university" name="university" v-model="postStore.keyword" placeholder="      Search for documents" @keyup.enter="onKeywordChange">
          <span class="input-group-text position-absolute start-2 border-0 pt-2" style="background: transparent;">
          <img src="/public/images/searchlogo.svg" alt="search icon" style="width: 20px; height: 20px;">
          </span>               
        </div>
      </div>

      <div class="d-flex row row-cols-4 gap-5 pt-5 pb-5">
        <div class="card col" style="width: 250px; height: 400px;" v-for="(post, index) in postStore.posts" :key="index">
              <div class="col position-relative pb-4 pt-2">
                <span class="position-absolute end-0 border-0">
                  <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;">
                    <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                  </button>
                </span>
              </div>
              <div class="col mx-auto pt-2">
                  <img src="/assets/images/kewun.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/assets/images/kewun.svg">
              </div>
              <div class="card-body position-relative">
                  <ul class="list-unstyled pt-3">
                      <li><small>{{ post.paper_type.name }}</small></li>  
                      <li class="pt-2"><h5>{{ post.title }}</h5></li>
                      <li><small>Published by {{ post.user?.username }}</small></li>  
                      <li>
                          <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                              <small><img src="/public/images/heart.svg" alt=""></small>
                              <small class="pt-1">{{ post.count_like }} Likes</small>
                          </span>
                      </li>
                  </ul>
              </div>
        </div>
      </div>
    </div>
    <div  class="modal fade" id="guestModal" tabindex="-1" aria-labelledby="guestModal" aria-hidden="true">
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
            <button class="btn btn-dark w-100"
            data-bs-toggle="modal"
            data-bs-target="#loginAccountModal">Sign In Now</button>
            <button class="btn btn-outline-dark w-100">
              Back to previous page
            </button>
            <p class="mt-3">
              Don’t Have An Account?
              <a href="3" class="text-primary"  data-bs-toggle="modal"
              data-bs-target="#createAccountModal">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>