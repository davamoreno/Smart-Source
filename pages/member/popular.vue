<script setup>
import { usePostStore } from '~/stores/MemberContent/post';

const postStore = usePostStore();
const startIndexLikes = ref(0);

onMounted( async () => {
    await postStore.getPost();
});

const sortedPostsByLikes = computed(() => {
  return [...postStore.posts].sort((a, b) => b.likes_count - a.likes_count);
});

const currentLikedPosts = computed(() => {
  if (!Array.isArray(sortedPostsByLikes.value)) {
    return [];
  }
  return sortedPostsByLikes.value.slice(startIndexLikes.value, startIndexLikes.value + postsPerPage);
});
</script>

<template>
    <div class="container" style="padding-left: 98px; padding-right: 98px;">

        <div class="d-flex row row-cols-4 gap-5 pt-5 pb-5">
        <router-link :to="`/member/detailpost/${post.slug}`" class="card col text-decoration-none" style="width: 250px; height: 400px;" v-for="(post, index) in sortedPostsByLikes" :key="index">
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
            </router-link>
      </div>
    </div>
</template>