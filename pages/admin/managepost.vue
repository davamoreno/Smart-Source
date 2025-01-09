<script setup>
definePageMeta({
    layout : 'blank'
});

import { onMounted } from 'vue';
import { postAdminStore } from '~/stores/AdminManagement/post';

const post = postAdminStore();

onMounted(() => {
  post.getPendingPost();
});

function changePage(page) {
  post.getPendingPost(page);
}

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
                  <tr v-for="(posts, index) in post.posts" :key="posts.id">
                    <td>{{ index + 1 + (post.currentPage - 1) * post.perPage }}</td>
                    <td>{{ posts.title }}</td>
                    <td>{{ posts.created_at }}</td>
                    <td style="justify-items: center;">
                        <p class="rounded-5 bg-warning text-center text-white" style="height: 100%; width: 100px; margin-top: 10px;">{{ posts.status }}</p>
                    </td>
                    <td>
                      <a v-if="posts.file" 
                       :href="`http://127.0.0.1:8000/storage/${posts.file.file_path}`" 
                       target="_blank"
                       class="btn btn-sm btn-primary text-white">
                      <i class="fa-solid fa-eye"></i> View File
                    </a>
                      <span v-else>File not available</span>
                    </td>
                    <td><a class="btn btn-sm text-white g-3 ms-2" style="background-color: #1D4ED8;">
                            <i class="fa-regular fa-floppy-disk"></i>
                            Allow
                        </a>
                        <a class="btn btn-warning btn-sm text-white ms-2">
                            <i class="fa-regular fa-floppy-disk"></i>
                            Deny
                        </a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer">
                <nav aria-label="Pagination">
                    <ul class="pagination justify-content-center mt-3">
                        <li class="page-item" :class="{ disabled: post.currentPage === 1 }">
                            <button class="page-link" @click="changePage(post.currentPage - 1)" :disabled="post.currentPage === 1">
                                &laquo; Previous
                            </button>
                        </li>
                        <li v-for="page in post.visiblePages"
                            :key="page"
                            :class="{ 'btn-primary' : post.currentPage === page }"
                            class="page-item">               
                            <button class="page-link" @click="changePage(page)">
                                {{ page }}
                            </button>
                        </li>
                        <li class="page-item" :class="{ disabled: post.currentPage === post.totalPages }">
                            <button class="page-link" @click="changePage(post.currentPage + 1)" :disabled="post.currentPage === post.totalPages">
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
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