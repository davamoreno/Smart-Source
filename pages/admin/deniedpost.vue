<script setup>
definePageMeta({
  layout: 'blank'
});

import { onMounted } from 'vue';
import { usePostStore } from '~/stores/MemberContent/post';

const post = usePostStore();

onMounted(() => {
  post.getDeniedPost();
});

</script>

<template>
  <div class="d-flex">
    <AdminSideBar />
    <div class="flex-grow-1 p-4 bg-light adminpost">
      <div class="container-fluid">
        <h2 class="fw-bold mb-4">Denied Post</h2>
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
                  v-for="(post, index) in post.deniedPost"
                  :key="post.id"
                  v-if="post.deniedPost.length"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.created_at }}</td>
                  <td>
                    <p
                      class="rounded-5 bg-primary text-center text-white"
                      style="height: 100%; width: 100px; margin-top: 10px;"
                    >
                      Published
                    </p>
                  </td>
                  <td>
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
                </tr>
                <tr v-else>
                  <td colspan="6" class="text-center">No Denied Post available</td>
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

</style>