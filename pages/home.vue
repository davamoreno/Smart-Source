<script setup>

import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { onMounted, computed } from 'vue';
import { definePageMeta } from '#build/imports';

// definePageMeta({
//   middleware : 'auth',
//   requiresAuth : true
// });

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


</style>