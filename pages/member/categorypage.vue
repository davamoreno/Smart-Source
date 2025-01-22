<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="cards-container">
      <router-link class="folder-card text-decoration-none" v-for="category in categoryStore.categories" :key="category.name" :to="`/member/categorytype/${category.name}`">
        <div class="folder-icon"></div>
        <div class="folder-name">{{ category.name }}</div>
      </router-link>
    </div>
  </div>
</template>


<script setup>
  import { useCategoryStore } from '~/stores/AdminManagement/category';
  import { usePaper } from '~/stores/AdminManagement/papertype';
  import { onMounted } from 'vue';
  import { usePostStore } from '~/stores/MemberContent/post';

  const categoryStore = useCategoryStore();
  const paperStore = usePaper();
  const postStore = usePostStore();

  onMounted(() => {
    postStore.getCategory();
    paperStore.getPaper();
    categoryStore.getCategories();
  });
</script>


<style lang="scss" scoped>
.container-fluid {
  background-color: #f8e9e9;
  font-family: 'Poppins', sans-serif;
  padding: 200px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px; /* Menggunakan gap untuk mengatur jarak antar kartu */
}

.folder-card {
  width: 275px; /* Tetapkan lebar tetap untuk kartu */
  height: 200px; /* Tetapkan tinggi tetap */
  background-color: #292929;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.folder-card:hover {
  transition: transform 0.1s ease-in-out;
  transform: scale(1.1);
}

.folder-icon {
  width: 67px;
  height: 49px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/public/images/paperpage.svg');
  margin-bottom: 10px;
}

.folder-name {
  color: #fff;
  font-size: 20px;
}
</style>
