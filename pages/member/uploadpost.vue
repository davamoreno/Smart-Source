<script>
export default {
  name: "UploadForm",
};

import DragDropUpload from '~/components/DragDropUpload.vue';

</script>

<template>
    <div class="container my-5" style="max-width: 820px;">
      <h2 class="text-center my-4">Upload your document</h2>
      <form class="px-4">
        <!-- Title -->
        <div class="mb-3 mt-5">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            id="title"
            class="form-control"
            placeholder="Enter document title"
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
          ></textarea>
        </div>
  
        <!-- Category -->
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select id="category" class="form-select">
            <option selected disabled>Search...</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>
  
        <!-- Paper Type -->
        <div class="mb-3">
          <label for="paperType" class="form-label">Paper Type</label>
          <select id="paperType" class="form-select">
            <option selected disabled>Select...</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
            <option value="3">Type 3</option>
          </select>
        </div>
        <div>
          <label class="form-label">Upload File</label>
    <DragDropUpload />
  </div>
        <!-- File Upload -->
       
  
        <!-- Buttons -->
        <div class="d-flex justify-content-end gap-4 mt-3">
          <button type="button" class="btn border border-danger bg-transparant text-danger px-4 ">Cancel</button>
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
  