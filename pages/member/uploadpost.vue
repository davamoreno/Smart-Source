<script setup>

import DragDropUpload from '~/components/DragDropUpload.vue';
import { useCategoryStore } from '~/stores/AdminManagement/category';
import { usePaper } from '~/stores/AdminManagement/papertype';
import { usePostStore } from '~/stores/Auth/Member/post';
const category = useCategoryStore();
const paper = usePaper();
const post = usePostStore();

function resetForm() {
  post.title = '';
  post.description = '';
  post.selectedCategory = '';
  post.selectedPaper = '';
  post.file = null;
}

async function handleCreatePost () {
  await post.createPost();
  resetForm();
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  post.file = file;
};


onMounted(() => {
    category.getCategories();
    paper.getPaper();
});

</script>

<template>
    <div class="container my-5" style="max-width: 820px;">
      <h2 class="text-center my-4">Upload your document</h2>
      <form class="px-4" @submit.prevent="handleCreatePost">
        <!-- Title -->
        <div class="mb-3 mt-5">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            id="title"
            class="form-control"
            placeholder="Enter document title"
            v-model="post.title"
          />
        </div>
  
        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            class="form-control"
            rows="4"
            placeholder="Enter description"
            v-model="post.description"
          ></textarea>
        </div>
  
        <!-- Category -->
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select 
                id="selectedCategory" 
                class="form-select" 
                v-model="post.selectedCategory"
                required
          >
            <option selected disabled>Select Category</option>
            <option v-for="categories in category.categories" :key="categories.id" :value="categories.id">
              {{ categories.name }}
            </option>
          </select>
        </div>
  
        <!-- Paper Type -->
        <div class="mb-3">
          <label for="paperType" class="form-label">Paper Type</label>
          <select 
                id="selectedPaper" 
                class="form-select" 
                v-model="post.selectedPaper"
                required
          >
            <option selected disabled>Select Paper</option>
            <option v-for="papers in paper.papers" :key="papers.id" :value="papers.id">
              {{ papers.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="form-label">Upload File</label>
          <DragDropUpload @file-selected="(file) => post.file = file" @change="handleFileUpload"  />
          <p v-if="post.file">Selected file: {{ post.file.name }}</p>
        </div>
        <div class="d-flex justify-content-end gap-4 mt-3">
          <NuxtLink to="/home" type="button" class="btn border border-danger bg-transparant text-danger px-4  ">Cancel</NuxtLink>
          <button type="submit" class="btn btn-primary px-4">Publish</button>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
  .container {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  