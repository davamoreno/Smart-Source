<script setup>
    import { useUniversityStore } from '~/stores/AdminManagement/university';
    const { $bootstrap } = useNuxtApp();
    const universityStore = useUniversityStore();
    const selectedUniv = ref(null);

    async function handleCreateUniversity(){
       await universityStore.createUniversity();
       await universityStore.getUniversity();
        if (!universityStore.isLoading) {
            const modal = document.getElementById('universityModal');
            const bootstrapModal = $bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();   
            
            
            universityStore.name = '';
        }
    }

    onMounted(() => {
        universityStore.getUniversity();
    });
    function setUnivForDeletion(university) {
      selectedUniv.value = university;
}

async function handleDeleteUniversity(id) {
  await universityStore.deleteUniversity(id);
  await universityStore.getUniversity();
  universityStore.name = '';
}
   
  
</script>
<template>
    <div class="card shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">University</h6>
          <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#universityModal">Add University</button>
        </div>
        <div class="card-body p-0">
          <table class="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>University</th>
                <th>Faculty Count</th>
                <th>Users Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(university, index ) in universityStore.universities" :key="university.index">
                <td>{{ index + 1  }}</td>
                <td>{{ university.name }}</td>
                <td>20</td>
                <td>20</td>
                <td><button class="btn btn-danger btn-sm "  data-bs-toggle="modal" data-bs-target="#deleteModalUniv" @click="setUnivForDeletion(university)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>

    <nav class="mt-4 mb-5">
      <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
      </ul>
    </nav>

    <div class="modal fade" id="universityModal" tabindex="-1" aria-labelledby="universityModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleCreateUniversity(universityStore.id)">
        <div class="modal-header">
          <h5 class="modal-title" id="universityModalLabel">Add university</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="universityName" class="form-label">University</label>
            <input type="text" class="form-control" id="universityName" placeholder="Nama University" v-model="universityStore.name">
          </div>
        </div>
        <div class="modal-footer">
          <UIBlueRoundedButton type="submit">Submit</UIBlueRoundedButton>
        </div>
        </form>
    </div>
  </div>

  <div class="modal fade" id="deleteModalUniv" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <span class="d-flex">
                                    <img src="/public/images/trash.svg" alt="">
                                    <p style="color: #FF5E5E;" class="ps-2 pt-3 fs-4 fw-medium">Delete University</p>
                                </span>
                                <div class=" justify-content-center text-center">
                                    <H4 class="mt-4 mb-1 fw-light">Confirm to delete </H4>
                                    <h2  class=" mb-5 fw-light">{{ selectedUniv?.name }} ?</h2>
                                </div>
                                <div class="row py-3">
                                    <div class="col">
                                        <button type="button" class="btn btn-danger btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div class="col">
                                        <button type="button" class="btn btn-primary btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal" @click="handleDeleteUniversity(selectedUniv.id) ">Yes</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

  
</template>