<template>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>