<script setup>

import { onMounted, computed } from 'vue';

definePageMeta({
    layout : 'blank',
    middleware : 'admin-auth',
    requiresAuth: true,  
});

</script>

<template>
    <div class="d-flex" >
      <AdminSideBar />
      <main class="flex-grow-1 p-4 bg-light">
        <div class="container-fluid">
          <h2 class="fw-bold mb-4">Dashboard</h2>
          <PagesAdminCard />
          <PagesAdminPaperAndCategory />
          <PagesAdminUniversity />
          <PagesAdminFaculty />
        </div>
      </main>
    </div>

    
  </template>
  
<style scoped lang="scss">

</style>
  