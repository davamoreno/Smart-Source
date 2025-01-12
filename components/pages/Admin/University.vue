<script setup>
    import { useUniversityStore } from '~/stores/AdminManagement/university';
    const { $bootstrap } = useNuxtApp();
    const universityStore = useUniversityStore();

    async function handleCreateUniversity(){
       await universityStore.createUniversity();
        if (!universityStore.isLoading) {
            const modal = document.getElementById('universityModal');
            const bootstrapModal = $bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();   
            
            await universityStore.getUniversity();
            universityStore.name = '';
        }
    }

    onMounted(() => {
        universityStore.getUniversity();
    });

    function handleDeleteUniversity(id) {
        universityStore.deleteUniversity(id);
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
                <td><button class="btn btn-danger btn-sm " @click="handleDeleteUniversity(university.id)">Delete</button></td>
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
      <form class="modal-content" @submit.prevent="handleCreateUniversity">
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
</template>