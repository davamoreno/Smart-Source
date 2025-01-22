<script setup>
import { useUniversityStore } from '~/stores/AdminManagement/university';
import { usefacultyStore } from '~/stores/AdminManagement/faculty';

const university = useUniversityStore();
const faculty = usefacultyStore();
const facultiesWithUniversity = ref([]);

async function handleCreateFaculty () {
  await faculty.createFaculty();
  await faculty.getFaculty();
}

function setFacultyForDeletion(faculties) {
      selectedFaculty.value = faculties;
}

async function handleDeleteFaculty (id) {
  await faculty.deleteFaculty(id);
  await faculty.getFaculty();

}
onMounted(async () => {
  await university.getUniversity();
  await faculty.getFaculty();
  
  facultiesWithUniversity.value = faculty.faculties.map(fac => {
    const uni = university.universities.find(u => u.id === fac.universityId);
    return {
      ...fac,
      universityName: uni ? uni.name : 'Unknown'
    };
  });
});
</script>

<template>
    <div class="card shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Faculty</h6>
            <button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#facultyModal">Add Faculty</button>
        </div>
        <div class="card-body p-0">
          <table class="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Faculty</th>
                <th>University</th>
                <th>Users Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(faculties, index) in facultiesWithUniversity" :key="faculties.id">
                <td>{{ index + 1 }}</td>
                <td>{{ faculties.name }}</td>
                <td>{{ faculties.universityName }}</td>
                <td>20</td>
                <td><button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModalFaculty" @click="setFacultyForDeletion(faculties)"  >Delete</button></td>

              </tr>
              <div class="modal fade" id="deleteModalFaculty" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <span class="d-flex">
                                    <img src="/public/images/trash.svg" alt="">
                                    <p style="color: #FF5E5E;" class="ps-2 pt-3 fs-4 fw-medium">Delete Faculty</p>
                                </span>
                                <div class=" justify-content-center text-center">
                                    <H4 class="mt-4 mb-1 fw-light">Confirm to delete </H4>
                                    <h2  class=" mb-5 fw-light">{{ selectedFaculty?.name }} ?</h2>
                                </div>
                                <div class="row py-3">
                                    <div class="col">
                                        <button type="button" class="btn btn-danger btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div class="col">
                                        <button type="button" class="btn btn-primary btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal" @click="handleDeleteFaculty(selectedFaculty.id) ">Yes</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </tbody>
          </table>
        </div>
    </div>
  <nav class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">4</a></li>
      <li class="page-item"><a class="page-link" href="#">5</a></li>
    </ul>
  </nav>    

  <div class="modal fade" id="facultyModal" tabindex="-1" aria-labelledby="facultyModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="handleCreateFaculty">
          <div class="modal-header">
            <h5 class="modal-title" id="facultyModalLabel">Add Faculty</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="selectUniversity" class="form-label">Select University</label>
              <select 
                id="selectUniversity" 
                class="form-select" 
                v-model="faculty.selectedUniversity"
                required
                
              >
                <option value=""  disabled>Select universities</option>
                <option v-for="universities in university.universities" :key="universities.id" :value="universities.id">
                  {{ universities.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="facultyName" class="form-label">Faculty</label>
              <input 
                type="text" 
                id="facultyName" 
                class="form-control" 
                placeholder="Faculty Name" 
                v-model="faculty.name"
                :disabled="!faculty.selectedUniversity"
                required
               
              />
            </div>
          </div>
          <div class="modal-footer">
            <UIBlueRoundedButton type="submit" data-bs-dismiss="modal">Submit</UIBlueRoundedButton>
          </div>
        </form>
      </div>
    </div>

    
  
</template>