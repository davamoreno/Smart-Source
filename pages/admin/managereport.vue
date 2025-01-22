<script setup>
definePageMeta({
    layout : 'blank'
})
import { onMounted } from 'vue';
import { postAdminStore } from '~/stores/AdminManagement/post';

const report = postAdminStore();

const postValidate = (id, status) => {
  report.reportValidation(id, status);
}

onMounted(() => {
  report.getPendingReport();
});

const formatRelativeDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

</script>

<template>
    <div class="d-flex">
        <AdminSideBar />
        <div class="flex-grow-1 p-4 bg-light" style="height: 695px;">
            <div class="container-fluid">
                <h2 class="fw-bold mb-4">Manage Report</h2>
                <div class="card shadow-sm">
            <div class="card-body p-0">
              <table class="table table-bordered mb-0">
                <thead class="thead-light">
                  <tr>
                    <th class="col table-secondary">No.</th>
                    <th class="col table-secondary">Title Post</th>
                    <th class="col table-secondary">Date</th>
                    <th class="col table-secondary">Status</th>
                    <th class="col table-secondary">Report Count</th>
                    <th class="col table-secondary" style="width: 180px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  v-for="(reports, index) in report.reports"
                  :key="reports.id"
                  v-if="report.reports.length"
                  >
                    <td class="center-content">{{ index + 1 }}</td>
                    <td class="center-content">{{ reports.title }}</td>
                    <td class="center-content">{{ formatRelativeDate(reports.created_at) }}</td>
                    <td style="justify-items: center;">
                        <p class="rounded-5 bg-warning text-center text-white" style="height: 100%; width: 100px; margin-top: 10px;">{{ reports.report_status }}</p>
                    </td>
                    <td class="center-content"> 
                      <router-link :to="`/admin/reportreason/${reports.id}`" class="btn btn-sm btn-primary text-white px-3 text-center"> 
                        <i class="fa-solid fa-envelope">
                        </i> {{ reports.reports?.length || 0 }} 
                      </router-link> 
                    </td> 
                    <td class="center-content">
                      <button
                        class="btn btn-sm text-white g-3 ms-2 btn-success"
                        @click="postValidate(reports.id, 'accept')"> 
                      Accept
                      </button>
                      <button
                        class="btn btn-danger btn-sm text-white ms-2"
                        @click="postValidate(reports.id, 'reject')">
                      Reject
                    </button>
                    </td>
                  </tr>
                  <tr v-else>
                   <td colspan="6" class="text-center">No Report To Handle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            </div>
        </div>
    </div>
</template>

<style scoped> 
.center-content { 
  text-align: center; 
  vertical-align: middle; 
  } 
</style>