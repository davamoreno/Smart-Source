<script setup>

import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { onMounted, computed } from 'vue';
import { definePageMeta } from '#build/imports';

definePageMeta({
  middleware : 'auth',
  requiresAuth : true
});

const memberAuthStore = useMemberAuthStore();
const user = computed(() => memberAuthStore.userProfile);

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <SideBar/>

      <!-- Main Content -->
      <div class="col-md-9">
        <div class="mb-3 p-5">
          <input type="text" class="form-control" placeholder="Search for documents..." />
        </div>

        <div class="row">
            <div class="col-6 ms-5"><h5 class="pink-header">Latest Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <a href="#" class="view-more">View More</a>
            </div>
          </div>
        <!-- Latest Documents -->
        <section class="px-5">
          <div class="row" style="gap: 30px">
            <DocumentCard
              v-for="(doc, index) in latestDocuments"
              :key="index"
              :title="doc.title"
              :category="doc.category"
              :publisher="doc.publisher"
            />
          </div>
        </section>

        <!-- Most Liked Documents -->
        <section class="mt-5 px-5 pb-5">
          <div class="row">
            <div class="col-10"><h5 class="pink-header">Most Liked Documents</h5></div>
            <div class="col-md-2 ms-auto">
              <a href="#" class="view-more">View More</a>
            </div>
          </div>
          <div class="row g-5">
            <DocumentCard
              v-for="(doc, index) in likedDocuments"
              :key="index"
              :title="doc.title"
              :category="doc.category"
              :publisher="doc.publisher"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">

body {
  background-color: #ffe6eb;
}

.pink-header {
  color: #000;
}

.menu-item.logout {
  .nav-link {
    color: red;
  }
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 5px; /* Jarak antara ikon dan teks */
  margin-bottom: 10px; /* Jarak antar menu */

  .menu-icon {
    margin-right: 5px;
    width: 24px; /* Ukuran ikon */
    height: auto;
  }

  .nav-link {
    font-weight: bold;
    text-decoration: none;
    font-size: 16px;
    color: #333;
    transition: color 0.3s ease;

  }
}

.menu-item .nav-link {
  padding-left: 0;
}

.view-more {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
}

.sidebar {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.sidebar h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.sidebar p {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.profile-img {
  border-radius: 50%;
}

</style>