<template>
    <div class="card shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Faculty</h6>
            <button class="btn btn-primary btn-sm">Add Faculty</button>
        </div>
        <div class="card-body p-0">
          <table class="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Faculty</th>
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
</template>