<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-6 mb-4" v-for="category in categories" :key="category.name">
        <div class="category-card" :style="{ backgroundColor: category.bgColor }">
          <!-- Perbaikan Sintaks -->
          <div class="category-image" :style="{ backgroundImage: `url(${category.imageUrl})` }"></div>
          <h5 class="category-title">{{ category.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "Sains & Math",
          bgColor: "#ff6f61",
          imageUrl: "/images/sainsmath.svg",
        },
        {
          name: "Tourism",
          bgColor: "#4caf50",
          imageUrl: "/images/tourism.svg",
        },
        {
          name: "Technology",
          bgColor: "#2196f3",
          imageUrl: "/images/technology.svg",
        },
        {
          name: "Law",
          bgColor: "#9e9e9e",
          imageUrl: "/images/law.svg",
        },
        {
          name: "Business",
          bgColor: "#ffeb3b",
          imageUrl: "/images/business.svg",
        },
        {
          name: "Social",
          bgColor: "#009688",
          imageUrl: "/images/social.svg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
body {
  font-family: "Poppins", sans-serif;
  background-color: #f8e9e9;
  margin: 0;
}

.category-card {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.category-title {
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
</style>
