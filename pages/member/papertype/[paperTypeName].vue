<script setup>
import { usePostStore } from '~/stores/MemberContent/post';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const name = route.params.paperTypeName;
const memberAuthStore = useMemberAuthStore(); 

onMounted(() => {
  postStore.getPaper(name);
  memberAuthStore.getUserProfile();

});

</script>

<template>
    <div class="container" style="padding-left: 98px; padding-right: 98px;">

      <div class="row justify-content-center pt-5">
        
      </div>
      
        <div class="d-flex row row-cols-4 gap-5 pt-5 pb-5">
          <router-link :to="`/member/detailpost/${paper.slug}`" class="text-decoration-none text-black" v-for="paper in postStore.papers" :key="paper.name" v-if="memberAuthStore.userProfile?.role ==='member'">
          <div class="card col "  style="width: 250px; height: 400px;" >
           
                <div class="col position-relative pb-4 pt-2" >
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
                        <li><small>{{ paper.paper_type_id }}</small></li>  
                        <li class="pt-2"><h5>{{ paper.title }}</h5></li>
                        <li><small>Published by {{ paper.user?.username }}</small></li>  
                        <li>
                            <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                                <small><img src="/public/images/heart.svg" alt=""></small>
                                <small class="pt-1">{{ paper.likes_count }} Likes</small>
                            </span>
                        </li>
                    </ul>
                </div>
            
              
          </div>
        </router-link>
        
          <div class="card col " v-for="papers in postStore.papers" :key="papers.name" style="width: 250px; height: 400px;" v-else >
            
                <div class="col position-relative pb-4 pt-2" >
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
                        <li><small>{{ papers.paper_type_id }}</small></li>  
                        <li class="pt-2"><h5>{{ papers.title }}</h5></li>
                        <li><small>Published by {{ papers.user?.username }}</small></li>  
                        <li>
                            <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                                <small><img src="/public/images/heart.svg" alt=""></small>
                                <small class="pt-1">{{ papers.likes_count }} Likes</small>
                            </span>
                        </li>
                    </ul>
                </div>
          
              
          </div>
      </div>
    </div>
</template>