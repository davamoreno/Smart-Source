<script setup>
import { usePostStore } from '~/stores/MemberContent/post';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const member = useMemberAuthStore();
const guestModal = ref(false);

onMounted(() => {
  member.getUserProfile();
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


      <div class="d-flex row row-cols-4 gap-5 pt-5 pb-5">
        
        <router-link class="text-decoration-none" v-for="(post, index) in postStore.posts" :key="index" :to="`/member/detailpost/${post.slug}`" v-if="member.userProfile.role === 'member'">
          <div class="card col" style="width: 250px; height: 400px;">
                <div class="col position-relative pb-4 pt-3 me-3">
                  <span class="position-absolute end-0 border-2">
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
        </router-link>

        <div class="card col" style="width: 250px; height: 400px;" v-for="(post, index1) in postStore.posts" :key="index1" v-else>
                <div class="col position-relative pb-4 pt-2" @click="openModal">
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
</template>