<script setup>
definePageMeta({
  layout: 'blank'
});

</script>

<template>
  <div class="d-flex">
    <AdminSideBar />
    <div class="flex-grow-1 p-4 bg-light adminpost">
      <div class="container-fluid">
        <h2 class="fw-bold mb-4">Rejected Reports</h2>
        <div class="card shadow-sm">
          <div class="card-body p-0">
            <table class="table table-bordered mb-0">
              <thead class="thead-light">
                <tr>
                  <th class="col table-secondary">No.</th>
                  <th class="col table-secondary">Title Post</th>
                  <th class="col table-secondary">Date</th>
                  <th class="col table-secondary">Status</th>
                  <th class="col table-secondary">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>B</td>
                  <td>C</td>
                  <td>
                    <p
                      class="rounded-5 bg-primary text-center text-white"
                      style="height: 100%; width: 100px; margin-top: 10px;"
                    >
                      Published
                    </p>
                  </td>
                  <td>
                    <a
                     
                      target="_blank"
                      class="btn btn-sm btn-primary text-white"
                    >
                      <i class="fa-solid fa-eye"></i> View File
                    </a>
                  
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .adminpost{
    max-height: 100%;
    height: 695px;
    @media(max-width: 576px){
      height: 800px;
    }
  }

</style>