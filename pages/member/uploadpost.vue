<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '~/stores/AdminManagement/category';
import { usePaper } from '~/stores/AdminManagement/papertype';
import { usePostStore } from '~/stores/MemberContent/post';

const category = useCategoryStore();
const paper = usePaper();
const post = usePostStore();
const showModal = ref(false);

async function handleCreatePost() {
  await post.createPost();
  if (!post.error) {
    showModal.value = true; // Tampilkan modal
    resetForm();
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  post.file = file;
};

function resetForm() {
  post.resetForm();
}

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
          required
          oninvalid="this.setCustomValidity('Title tidak boleh kosong.')"
          oninput="this.setCustomValidity('')"
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

      <!-- File Upload -->
      <div>
        <label class="form-label">Upload File</label>
        <DragDropUpload @file-selected="(file) => post.file = file" @change="handleFileUpload" />
        <p v-if="post.file">Selected file: {{ post.file.name }}</p>
      </div>

      <!-- Submit Button -->
      <div class="d-flex justify-content-end gap-4 mt-3">
        <NuxtLink to="/member/home" type="button" class="btn border border-danger bg-transparant text-danger px-4" @click="resetForm">Cancel</NuxtLink>
        <button  data-bs-toggle="modal" data-bs-target="#showModal" type="submit" class="btn btn-primary px-4" :disabled="post.loading">
          <span v-if="post.loading">Uploading...</span>
          <span v-else>Publish</span>
        </button>
      </div>
    </form>
  </div>


  <div v-if="showModal" id="showModal" class="modal fade show d-block" aria-labelledby="showModal" aria-hidden="true" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body text-center" style="padding: 50px;">
        <h3 class="mb-4">Post Created</h3>
        <p class="mb-5" style="color: #6c757d;">Your document has successfully uploaded and will be able to access by public user.</p>
        <div class="">
          <NuxtLink to="/member/mypost" type="button" class="btn btn-primary rounded-3 py-2 w-75">Go to My Post</NuxtLink>
        </div>
      </div>
    </div>
  </div>
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
