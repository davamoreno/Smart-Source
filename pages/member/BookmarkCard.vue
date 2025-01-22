<script setup>
import { useBookmarkStore } from '~/stores/MemberContent/bookmark';
import { usePostStore } from '~/stores/MemberContent/post';
import { onMounted } from 'vue';

const bookmarkStore = useBookmarkStore();
const postStore = usePostStore();

onMounted(() => {
  bookmarkStore.getBookmarks();
  postStore.showPostDetail();
});

const deletedBoomark = async (postId) => {
    await bookmarkStore.delete(postId);
    const postIndex = bookmarkStore.bookmarks.findIndex(bookmark => bookmark.post.id === postId); 
      if (postIndex > -1) { 
        bookmarkStore.bookmarks.splice(postIndex, 1); 
      } 
    const post = postStore.posts.find(post => post.id === postId); 
      if (post) { 
        post.bookmark = false; 
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
  <div class="container-fluid overflow-x-hidden">
    <div class="row">
      <SideBar />
      <div class="col my-4 px-5 ms-4">
        <h2 class="my-3">Bookmarks</h2>    
        <div class="row">
          <router-link v-for="bookmark in bookmarkStore.bookmarks" :key="bookmark.id" class="col-4 pt-3 pb-5 text-decoration-none" :to="`/member/detailpost/${bookmark.post.slug}`">
            <div>
              <div class="card col" style="width: 250px; height: 360px;">
                <div class="col position-relative pt-3 me-3">
                  <span class="position-absolute end-0 border-2">
                    <button class="rounded-circle" style="background-color: transparent; width: 40px; height: 40px;">
                      <img src="/public/images/Bookmark2.svg" alt="" class="pe-1" style="width: 30px; height: 30px;" @click.prevent="deletedBoomark(bookmark.post.id)"> 
                    </button>
                  </span>
                </div>
                <div class="col mx-auto pt-2">
                  <img src="/assets/images/kewun.svg" class="card-img-top" style="width: 108px; height: 142px;" alt="Document Image">
                </div>
                <div class="card-body position-relative" style="height: 100px;">
                  <ul class="list-unstyled pt-3">
                    <li><small></small></li>
                    <li class="pt-2"><h5>{{ bookmark.post.title }}</h5></li>
                    <li><small>Published by {{ bookmark.user.username }}</small></li>
                    <li class="card-foote">
                        <span class="position-absolute bottom-0 start-0 ps-2 pb-2" v-if="!postStore.postDetail?.like">
                            <small @click.prevent="createdLike(bookmark.post.slug)"><img src="/public/images/heart.svg" alt="" class="icon-love"></small>
                            <small class="pt-1">10 Likes</small>
                        </span>
                        <span class="position-absolute bottom-0 start-0 ps-2 pb-2" v-else>
                            <small @click.prevent="deletedLike(bookmark.post.slug)"><img src="/public/images/heart-fill.svg" class="icon-love-filled ms-2"></small>
                            <small class="pt-1">10 Likes</small>
                        </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </router-link>
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