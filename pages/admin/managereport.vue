<script setup>
definePageMeta({
    layout : 'blank'
})
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
                  <tr>
                    <td>1</td>
                    <td>Politeknik Negeri Bali</td>
                    <td>20/20/2024</td>
                    <td style="justify-items: center;">
                        <p class="rounded-5 bg-warning text-center text-white" style="height: 100%; width: 100px; margin-top: 10px;">Pending</p>
                    </td>
                    <td>20</td>  
                    <td>
                        <a class="btn btn-sm text btn-success text-white ms-2" style="width: auto;">
                            Accept
                        </a>
                        <a class="btn btn-danger btn-sm text-white ms-2" style="width: 60px;">
                            Reject
                        </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Universitas Jember</td>
                    <td>21/20/2024</td>
                    <td class="col-3" style="justify-items: center;">
                        <p class="rounded-5 bg-warning text-center text-white text-sm" style="height: 100%; width: 100px; margin-top: 10px;">Pending</p>
                    </td>
                    <td>21</td>
                    <td>
                        <a class="btn btn-sm text btn-success text-white ms-2">
                            Accept
                        </a>
                        <a class="btn btn-danger btn-sm text-white ms-2" style="width: 60px;">
                            Reject
                        </a>
                    </td>
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