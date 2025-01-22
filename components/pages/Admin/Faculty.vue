<script setup>
import { useUniversityStore } from '~/stores/AdminManagement/university';
import { usefacultyStore } from '~/stores/AdminManagement/faculty';

const university = useUniversityStore();
const faculty = usefacultyStore();

async function handleCreateFaculty () {
  await faculty.createFaculty();
  await faculty.getFaculty();
}

onMounted(() => {
    university.getUniversity();
    faculty.getFaculty();
});

function changePage(page) {
    faculty.getFaculty(page);
}
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
              <tr  v-for="(faculties, index) in faculty.faculty" :key="faculties.id">
                <td>{{ index + 1 }}</td>
                <td>{{ faculties.name }}</td>
                <td>{{ faculties.universities }}</td>
                <td>20</td>
                <td><button class="btn btn-danger btn-sm">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="card-footer">
      <nav aria-label="Pagination">
          <ul class="pagination justify-content-center mt-3">
              <li class="page-item" :class="{ disabled: faculty.currentPage === 1 }">
                  <button class="page-link" @click="changePage(faculty.currentPage - 1)" :disabled="faculty.currentPage === 1">
                      &laquo; Previous
                  </button>
              </li>
              <li v-for="page in faculty.visiblePages"
                  :key="page"
                  :class="{ 'btn-primary' : faculty.currentPage === page }"
                  class="page-item">               
                  <button class="page-link" @click="changePage(page)">
                      {{ page }}
                  </button>
              </li>
              <li class="page-item" :class="{ disabled: faculty.currentPage === faculty.totalPages }">
                  <button class="page-link" @click="changePage(faculty.currentPage + 1)" :disabled="faculty.currentPage === faculty.totalPages">
                      Next &raquo;
                  </button>
              </li>
          </ul>
      </nav>
    </div>

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