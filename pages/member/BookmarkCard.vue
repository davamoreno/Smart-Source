<script setup>
import { useBookmarkStore } from '~/stores/MemberContent/bookmark';

const bookmark = useBookmarkStore();

onMounted(() => {
  bookmark.get()
});
</script>

<template>
  <div class="container-fluid overflow-x-hidden">
    <div class="row">
      <SideBar />
      <div class="col my-4 px-5 ms-4">
        <h2 >Bookmarks</h2>
        <div class="row">
          <div class=" col-4 mb-4 gap-5" v-for="bookmarks in bookmark.bookmarks" :key="bookmarks.id"
          >
            <div class="card mb-4" style="width: 250px; height: 400px;">
              <div class="position-relative pb-4 pt-2">
                <span class="position-absolute" style="right: 10px;">
                  <button class="rounded-circle" style="width: 40px; height: 40px;">
                    <img src="/public/images/Bookmark2.svg" alt="" class="pe-1" style="width: 30px; height: 30px;">
                  </button>
                </span>
              </div>
              <div class="col mx-auto pt-2">
                <img src="/public/images/File_light.svg" class="card-img-top" style="width: 200px; height: 200px;" alt="Document Image">
              </div>
              <div class="card-body position-relative">
                <ul class="list-unstyled pt-3">
                  <li><small> </small></li>
                  <li class="pt-2"><h5>{{ bookmarks.post.title }}</h5></li>
                  <li><small>Published by </small></li>
                  <ul>
                    <span class="position-absolute bottom-0 start-0 ps-2 pb-2">
                      <small><img src="/public/images/heart.svg" alt="Heart Icon"></small>
                      <small class="pt-1">10 Likes</small>
                    </span>
                  </ul>
                </ul>
              </div>
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