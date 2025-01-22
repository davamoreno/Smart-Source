<script setup>
definePageMeta({
  layout: 'blank'
});

import { onMounted } from 'vue';
import { postAdminStore } from '~/stores/AdminManagement/post';

const post = postAdminStore();
const postValidate = async (id, status) => {
  try {
    await post.postValidation(id, status);
    await post.getPendingPost();
  } catch (err) {
    console.error('Error validating post:', err);
  }
}

const formatRelativeDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

onMounted(() => {
  post.getPendingPost();
});

</script>

<template>
  <div class="d-flex">
    <AdminSideBar />
    <div class="flex-grow-1 p-4 bg-light adminpost">
      <div class="container-fluid">
        <h2 class="fw-bold mb-4">Manage Post</h2>
        <div class="card shadow-sm">
          <div class="card-body p-0">
            <table class="table table-bordered mb-0">
              <thead class="thead-light">
                <tr>
                  <th class="col table-secondary">No.</th>
                  <th class="col table-secondary">Title Post</th>
                  <th class="col table-secondary">Date</th>
                  <th class="col table-secondary">Status</th>
                  <th class="col table-secondary">Details</th>
                  <th class="col table-secondary" style="width: 180px">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(post, index) in post.posts"
                  :key="post.id"
                  v-if="post.posts.length"
                >
                  <td class="center-content">{{ index + 1 }}</td>
                  <td class="center-content">{{ post.title }}</td>
                  <td class="center-content">{{ formatRelativeDate(post.created_at) }}</td>
                  <td class="center-content">
                    <p
                      class="rounded-5 bg-warning text-center text-white"
                      style="height: 100%; width: 100px; margin-top: 10px;"
                    >
                      {{ post.status }}
                    </p>
                  </td>
                  <td class="center-content">
                    <a
                      v-if="post.file"
                      :href="`https://smartsource.nio.my.id/storage/${post.file.file_path}`"
                      target="_blank"
                      class="btn btn-sm btn-primary text-white"
                    >
                      <i class="fa-solid fa-eye"></i> View File
                    </a>
                    <span v-else>File not available</span>
                  </td>
                  <td class="center-content">
                    <button
                      class="btn btn-sm text-white g-3 ms-2"
                      style="background-color: #1D4ED8;"
                      @click="postValidate(post.id, 'allow')"
                    >
                      <i class="fa-regular fa-floppy-disk"></i> Allow
                    </button>
                    <button
                      class="btn btn-warning btn-sm text-white ms-2"
                      @click="postValidate(post.id, 'deny')"
                    >
                      <i class="fa-regular fa-floppy-disk"></i> Deny
                    </button>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="6" class="text-center">No posts available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .adminpost{
    max-height: 100%;
    height: 695px;
    @media(max-width: 576px){
      height: 800px;
    }
  }

  .center-content { 
  text-align: center; 
  vertical-align: middle; 
  } 

</style>