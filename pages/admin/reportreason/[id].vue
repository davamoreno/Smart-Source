<script setup>
import { onMounted } from 'vue';
import { postAdminStore } from '~/stores/AdminManagement/post';

definePageMeta({
    layout : 'blank'
});

const route = useRoute();

const id = route.params.id;

const report = postAdminStore();

onMounted(() => {
  report.getReportReason(id);
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
                    <tr v-for="reports, index in report.reportReason" :key="reports.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ reports.user?.username }}</td>
                      <td>{{ reports.reason }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>