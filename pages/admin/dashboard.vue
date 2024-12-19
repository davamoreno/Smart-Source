<script setup>

definePageMeta({
    layout : 'blank'
})

</script>

<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <AdminSideBar />
  
      <!-- Main Content -->
      <main class="flex-grow-1 p-4 bg-light">
        <div class="container-fluid">
          <!-- Header -->
          <h2 class="fw-bold mb-4">Dashboard</h2>
  
          <!-- Stat Cards -->
          <div class="row g-3 mb-4">
            <div class="col-md-3">
              <div class="card stat-card shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-plus-circle stat-icon text-primary"></i>
                  <h5 class="stat-value">2</h5>
                  <p class="stat-label">Post Created</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card stat-card shadow-sm">
                <div class="card-body text-center">
                  <i class="fa-regular fa-flag stat-icon text-info"></i>
                  <h5 class="stat-value">10</h5>
                  <p class="stat-label">Received Report</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card stat-card shadow-sm">
                <div class="card-body text-center">
                  <i class="fa-solid fa-book stat-icon text-success"></i>
                  <h5 class="stat-value">6</h5>
                  <p class="stat-label">Category</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card stat-card shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-file-alt stat-icon text-warning"></i>
                  <h5 class="stat-value">6</h5>
                  <p class="stat-label">Paper Type</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Category & Paper Type Tables -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="mb-0">Category</h6>
                  <button class="btn btn-primary btn-sm">Add Category</button>
                </div>
                <div class="card-body p-0">
                  <table class="table table-bordered table-striped mb-0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Sains & Math</td>
                        <td><button class="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Tourism</td>
                        <td><button class="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                      <!-- Tambahkan data lain di sini -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="mb-0">Paper Type</h6>
                  <button class="btn btn-primary btn-sm">Add Paper Type</button>
                </div>
                <div class="card-body p-0">
                  <table class="table table-bordered table-striped mb-0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Paper Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Makalah</td>
                        <td class="justify-content-center">
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jurnal</td>
                        <td><button class="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                      <!-- Tambahkan data lain di sini -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">University</h6>
              <button class="btn btn-primary btn-sm">Add University</button>
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
                  <tr>
                    <td>1</td>
                    <td>Politeknik Negeri Bali</td>
                    <td>20</td>
                    <td>20</td>
                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Universitas Jember</td>
                    <td>21</td>
                    <td>21</td>
                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
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

          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">University</h6>
              <button class="btn btn-primary btn-sm">Add University</button>
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
                  <tr>
                    <td>1</td>
                    <td>Politeknik Negeri Bali</td>
                    <td>20</td>
                    <td>20</td>
                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Universitas Jember</td>
                    <td>21</td>
                    <td>21</td>
                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
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
        </div>
      </main>
    </div>

    
  </template>
  
  <style scoped lang="scss">
  .stat-card {
    border: none;
    background: white;
  
    .stat-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
  
    .stat-value {
      font-size: 24px;
      font-weight: bold;
    }
  
    .stat-label {
      color: #6c757d;
      font-size: 14px;
    }
  }
  </style>
  