<script setup>
definePageMeta({
    layout : 'blank'
})
import { onMounted } from 'vue';
import { postAdminStore } from '~/stores/AdminManagement/post';

const report = postAdminStore();

onMounted(() => {
  report.getPendingReport();
});
</script>

<template>
    <div class="d-flex">
        <AdminSideBar />
        <div class="flex-grow-1 p-4 bg-light" style="height: 695px;">
            <div class="container-fluid">
                <h2 class="fw-bold mb-4">Report Reason</h2>
                <div class="card shadow-sm">
            <div class="card-body p-0">
              <table class="table table-bordered mb-0">
                <thead class="thead-light">
                  <tr>
                    <th class="col table-secondary">No.</th>
                    <th class="col table-secondary">Reported By</th>
                    <th class="col table-secondary">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Abhi</td>
                    <td>Jelek</td>
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
            </div>
        </div>
    </div>
</template>