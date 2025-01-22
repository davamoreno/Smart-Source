<script setup>
  import { onMounted } from 'vue';
  import { useCategoryStore } from '~/stores/AdminManagement/category';
import { usePaper } from '~/stores/AdminManagement/papertype';
import { postAdminStore } from '~/stores/AdminManagement/post';

  const category = useCategoryStore();
  const post = postAdminStore();
  const paperType = usePaper();

  onMounted(() => {
    category.getCategories();
    category.totalItems
    post.totalItems
    post.getPendingPost()
    post.getPendingReport()
    post.totalReportItems
    paperType.totalItems
  });
</script>

<template>
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="card stat-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-plus-circle stat-icon text-primary"></i>
            <h5 class="stat-value">{{ post.totalItems }}</h5>
            <p class="stat-label">Pending Post</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card shadow-sm">
          <div class="card-body text-center">
            <i class="fa-regular fa-flag stat-icon text-info"></i>
            <h5 class="stat-value">{{ post.totalReportItems }}</h5>
            <p class="stat-label">Received Report</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card shadow-sm">
          <div class="card-body text-center">
            <i class="fa-solid fa-book stat-icon text-success"></i>
            <h5 class="stat-value">{{ category.totalItems }}</h5>
            <p class="stat-label">Category</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card stat-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-file-alt stat-icon text-warning"></i>
            <h5 class="stat-value">{{ paperType.totalItems }}</h5>
            <p class="stat-label">Paper Type</p>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.stat-card {
  border: none;
  background: white;

  .stat-icon {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
  }

  .stat-label {
    color: #6c757d;
    font-size: 14px;
  }
}
</style>