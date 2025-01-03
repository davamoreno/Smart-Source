<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="row">
        <div class="col-md-4 mb-4" v-for="folder in folders" :key="folder.name">
          <div class="folder-card">
            <div class="folder-icon"></div>
            <div class="folder-name">{{ folder.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        folders: [
          { name: 'Skripsi' },
          { name: 'Makalah' },
          { name: 'Tugas Akhir' },
          { name: 'Laporan Praktikum' },
          { name: 'Tugas Harian' },
          { name: 'Tugas Jurnal' }
        ]
      };
    }
  };
  </script>
  
  <style lang="scss">
  
  .container-fluid {
    background-color: #f8e9e9;
    font-family: 'Poppins', sans-serif;
  }
  
  .folder-card {
    width: 100%;
    max-width: 300px;
    height: 200px;
    background-color: #007bff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
  }
  
  .folder-icon {
    width: 67px;
    height: 49px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('/public/images/path-to-folder-icon.svg');
    margin-bottom: 10px;
  }
  
  .folder-name {
    color: #fff;
    font-size: 20px;
  }
  </style>
  