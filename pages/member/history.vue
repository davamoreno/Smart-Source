<script setup>

import { usePostStore } from '~/stores/MemberContent/post';
import { onMounted } from 'vue';

const postStore = usePostStore();

onMounted(() => {
  postStore.getHistory();
});

</script>
<template>
    <div class="container-fluid overflow-x-hidden">
      <div class="row">
        <SideBar />
        <div class="col my-4 px-5 ms-4">
            <h2 class="my-3">Recent View Post</h2>
            <div class="row">
              <div v-for="history in postStore.histories" :key="history.id" class="col-4 pt-3 pb-5">
                <div>
                  <router-link :to="`/member/detailpost/${history.posts.slug}`" class="card col text-decoration-none" style="width: 250px; height: 350px;">
                          <div class="col position-relative pb-2 pt-3 me-3">
                              <!-- <span class="position-absolute end-0 border-0">
                              <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;">
                                  <img src="/public/images/bookmark.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                              </button>
                              </span> -->
                          </div>
                          <div class="col mx-auto pt-2">
                              <img src="/assets/images/kewun.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="/assets/images/kewun.svg">
                          </div>
                          <div class="card-body position-relative">
                              <ul class="list-unstyled pt-4">
                                  <li><small>{{ history.posts?.papertype?.name }}</small></li>  
                                  <li class="pt-2"><h5>{{ history.posts?.title }}</h5></li>
                                  <li><small>Published by {{ history.posts?.user?.username }}</small></li>  
                                  <!-- <li>
                                      <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                                          <small><img src="/public/images/heart.svg" alt=""></small>
                                          <small class="pt-1">{{ history.posts?.likes_count }} Likes</small>
                                      </span>
                                  </li> -->
                              </ul>
                          </div>
                  </router-link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>


</template>
  
<style lang="scss">
  .container-fluid {
    padding: 0;
  }
  
  .sidebar {
    background-color: #f8f9fa;
    padding: 20px;
    .profile-section {
      .profile-pic {
        width: 100px;
        height: 100px;
      }
      h4 {
        margin-top: 10px;
      }
      p {
        margin: 0;
      }
      button {
        margin-top: 10px;
      }
    }
    .nav {
      margin-top: 20px;
      .nav-link {
        color: #000;
        &.active {
          font-weight: bold;
        }
        &.text-danger {
          color: #dc3545;
        }
      }
    }
  }
  
  .content {
    padding: 20px;
    h2 {
      margin-bottom: 20px;
    }
    .card {
      margin-bottom: 20px;
      .card-img-top {
        object-fit: cover;
      }
      .card-body {
        .btn {
          margin-right: 10px;
        }
      }
    }
  }
</style>