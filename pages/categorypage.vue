<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="folder in folders" :key="folder.name">
        <div class="folder-card">
  <div class="folder-name">{{ folder.name }}</div>
  <div class="folder-icon"></div>
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
        { name: 'Sains & Math' },
        { name: 'Sains & Math' },
        { name: 'Sains & Math ' },
        { name: 'Sains & Math' },
        { name: 'Sains & Math' },
        { name: 'Sains & Math' }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>

.container-fluid {
  background-color: #f8e9e9;
  font-family: 'Poppins', sans-serif;
}

.folder-card {
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: #292929;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
}
.folder-card:hover{
  transition: transform 0.1s ease-in-out;
    transform: scale(1.1);
}

.folder-icon {
  width: 100px;
  height: 120px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/public/images/categorypage.svg');
  margin-top: 10px; 
}
.folder-name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  top: 15px; 
  left: 20px; 
}

</style>
