<script setup>
    import { useCategoryStore } from '~/stores/AdminManagement/category';
    import { usePaper } from '~/stores/AdminManagement/papertype';
    import { useRoute} from 'vue-router';
    

    const categoryStore = useCategoryStore();
    const { $bootstrap } = useNuxtApp();
    const paperStore = usePaper();
    const route = useRoute(); 
    const selectedPaper = ref(null);
    

const entityType = ref('');
const selectedEntity = ref(null);
  
    onMounted(() => {
        categoryStore.getCategories();
        paperStore.getPaper();
    });

    async function handleCreateCategory(){
       await categoryStore.createCategory();
        if (!categoryStore.isLoading) {
            const modal = document.getElementById('categoryModal');
            const bootstrapModal = $bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            await categoryStore.getCategories();
            categoryStore.name = '';
        }
    }

    async function handleDeleteCategory(id) {
      await categoryStore.deleteCategory(id);
      await categoryStore.getCategories();
      categoryStore.name = '';
    }

    function changePage(page) {
        categoryStore.getCategories(page);
    }

    async function handleCreatePaper(){
     await paperStore.createPaper();
     if (!paperStore.isLoading) {
            const modal = document.getElementById('paperModal');
            const bootstrapModal = $bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            await paperStore.getPaper();
            paperStore.name = '';
        }
    } 

    function setPaperForDeletion(paper) {
  selectedPaper.value = paper;
}

async function handleDeletePaper(id) {
  if (!id) return;
  await paperStore.deletePaper(id);
  await paperStore.getPaper();
  selectedPaper.value = null;
  
}

    function changePaperPage(page) {
        paperStore.getPaper(page);
    }
  
    function setEntityForDeletion(entity, type) {
  selectedEntity.value = entity;
  entityType.value = type;
}

async function handleDeleteEntity() {
  if (entityType.value === 'category') {
    await categoryStore.deleteCategory(selectedEntity.value.id);
    await categoryStore.getCategories();
  } else if (entityType.value === 'paper') {
    await paperStore.deletePaper(selectedEntity.value.id);
    await paperStore.getPaper();
  }
  selectedEntity.value = null;
  entityType.value = '';
}
</script>

<template>
    <div class="row g-4 mb-4">
        <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0">Category</h6>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#categoryModal">
                    Add Category
                </button>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered table-striped mb-0" style="height: 278px;">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="categoryStore.isLoading">
                            <td colspan="3" class="text-center">Loading...</td>
                        </tr>
                        <tr v-else-if="categoryStore.categories.length === 0">
                            <td colspan="3" class="text-center">No categories available</td>
                        </tr>
                        <tr v-for="(category, index) in categoryStore.categories" :key="category.id" v-if="categoryStore.isLoading === false">
                            <td>{{ index + 1 + (categoryStore.currentPage - 1) * categoryStore.perPage }}</td>
                            <td>{{ category.name }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal "  @click="setEntityForDeletion(category, 'category')">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <nav aria-label="Pagination">
                    <ul class="pagination justify-content-center mt-3">
                        <li class="page-item" :class="{ disabled: categoryStore.currentPage === 1 }">
                            <button class="page-link" @click="changePage(categoryStore.currentPage - 1)" :disabled="categoryStore.currentPage === 1">
                                &laquo; Previous
                            </button>
                        </li>
                        <li v-for="page in categoryStore.visiblePages"
                            :key="page"
                            :class="{ 'btn-primary' : categoryStore.currentPage === page }"
                            class="page-item">               
                            <button class="page-link" @click="changePage(page)">
                                {{ page }}
                            </button>
                        </li>
                        <li class="page-item" :class="{ disabled: categoryStore.currentPage === categoryStore.totalPages }">
                            <button class="page-link" @click="changePage(categoryStore.currentPage + 1)" :disabled="categoryStore.currentPage === categoryStore.totalPages">
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">Paper Type</h6>
              <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#paperModal">Add Paper Type</button>
            </div>
            <div class="card-body p-0">
              <table class="table table-bordered table-striped mb-0" style="height: 278px;">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Paper Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="paperStore.isLoading">
                      <td colspan="3" class="text-center">Loading...</td>
                  </tr>
                  <tr v-else-if="paperStore.papers.length === 0">
                      <td colspan="3" class="text-center">No paper available</td>
                  </tr>
                  <tr v-for="(paper, index) in paperStore.papers" :key="paper.id" v-if="paperStore.isLoading === false">
                    <td>{{ index + 1 + (paperStore.currentPage - 1) * paperStore.perPage}}</td>
                    <td>{{ paper.name }}</td>
                    <td class="justify-content-center">
                        <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal "  @click="setEntityForDeletion(paper, 'paper')"  >Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer">
                <nav aria-label="Pagination">
                    <ul class="pagination justify-content-center mt-3">
                        <li class="page-item" :class="{ disabled: paperStore.currentPage === 1 }">
                            <button class="page-link" @click="changePaperPage(paperStore.currentPage - 1)" :disabled="paperStore.currentPage === 1">
                                &laquo; Previous
                            </button>
                        </li>
                        <li v-for="page in paperStore.visiblePages"
                            :key="page"
                            :class="{ 'btn-primary' : paperStore.currentPage === page }"
                            class="page-item">               
                            <button class="page-link" @click="changePaperPage(page)">
                                {{ page }}
                            </button>
                        </li>
                        <li class="page-item" :class="{ disabled: paperStore.currentPage === paperStore.totalPages }">
                            <button class="page-link" @click="changePaperPage(paperStore.currentPage + 1)" :disabled="paperStore.currentPage === paperStore.totalPages">
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
          </div>
        </div>
    </div>

    <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleCreateCategory">
        <div class="modal-header">
          <h5 class="modal-title" id="categoryModalLabel">Add Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="categoryName" class="form-label">Category</label>
            <input type="text" class="form-control" id="categoryName" placeholder="Nama Kategori" v-model="categoryStore.name">
          </div>
        </div>
        <div class="modal-footer">
          <UIBlueRoundedButton type="submit">Submit</UIBlueRoundedButton>
        </div>
        </form>
    </div>
  </div>

  <div class="modal fade" id="paperModal" tabindex="-1" aria-labelledby="paperModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleCreatePaper">
        <div class="modal-header">
          <h5 class="modal-title" id="paperModalLabel">Add paper</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="paperName" class="form-label">Paper</label>
            <input type="text" class="form-control" id="paperName" placeholder="Nama Paper" v-model="paperStore.name">
          </div>
        </div>
        <div class="modal-footer">
          <UIBlueRoundedButton type="submit">Submit</UIBlueRoundedButton>
        </div>
        </form>
    </div>
  </div>

  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <span class="d-flex">
              <img src="/public/images/trash.svg" alt="">
              <p style="color: #FF5E5E;" class="ps-2 pt-3 fs-4 fw-medium">
                Delete {{ entityType === 'category' ? 'Category' : 'Paper' }}
              </p>
            </span>
            <div class="d-flex justify-content-center">
              <h4 class="mt-4 mb-5 fw-light">Confirm to delete {{ selectedEntity?.name }} ?</h4>
            </div>
            <div class="row py-3">
              <div class="col">
                <button type="button" class="btn btn-danger btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal">No</button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-primary btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal" @click="handleDeleteEntity">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>

<style scoped lang="scss">
    .border-dashed{
        font-size: 20px;
        background: transparent;
        border-width: 2px;
        border-radius: 3%;
        border-style: dashed;
        border-color: #0000FF;
        
    }
</style>