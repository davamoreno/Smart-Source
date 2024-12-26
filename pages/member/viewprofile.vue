<template>
    <div class="d-flex justify-content-center align-items-center vh-100 ">
        
      <!-- Container Profile Section -->
      <div class="card w-75 p-0" style="border-radius: 15px; max-width: 900px; overflow: hidden;">
        <div class="row g-0">
          <!-- Left Section: Profile Info -->
          <div
            class="col-md-4 d-flex flex-column align-items-center justify-content-center text-white "
            style="background-color: #000;"
          >
            <img
              :src="profileImage"
              alt="Profile Picture"
              class="rounded-circle mb-3"
              style="width: 135px; height: 135px; object-fit: cover;"
            />
            <h5>{{ name }}</h5>
            <p class="mb-1">{{ university }}</p>
            <p>{{ department }}</p>
          </div>
  
          <!-- Right Section: Contributions and Recent Posts -->
           
          <div class="col-md-8 p-4">
            <h5 class=" mt-4 mb-3">Profile User</h5>
            <!-- Combined Contribution Section -->
           
  <!-- Title Section -->
  <div
  class="p-3 bg-secondary text-white rounded-top " 
>
  <!-- Title Section -->
  <div class="d-flex text-center justify-center align-items-center">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4165 2.8335V10.7502L17.4165 10.8046C17.4164 11.2286 17.4163 11.6408 17.462 11.9807C17.5136 12.3639 17.6391 12.8012 18.0023 13.1644C18.3655 13.5276 18.8028 13.6531 19.186 13.7046C19.5259 13.7503 19.938 13.7503 20.3621 13.7502H20.3621L20.4165 13.7502H28.3332V22.6668C28.3332 26.6738 28.3332 28.6772 27.0884 29.922C25.8436 31.1668 23.8401 31.1668 19.8332 31.1668H14.1665C10.1596 31.1668 8.1561 31.1668 6.9113 29.922C5.6665 28.6772 5.6665 26.6738 5.6665 22.6668V11.3335C5.6665 7.32656 5.6665 5.32309 6.9113 4.07829C8.1561 2.8335 10.1596 2.8335 14.1665 2.8335H17.4165ZM19.4165 2.83438V10.7502C19.4165 11.2498 19.4186 11.524 19.4442 11.7142L19.4452 11.7215L19.4525 11.7225C19.6427 11.748 19.9168 11.7502 20.4165 11.7502H28.3323C28.3276 10.922 28.2986 10.4435 28.1175 10.0062C27.9018 9.48548 27.4924 9.07602 26.6734 8.2571L22.9096 4.49322C22.0906 3.6743 21.6812 3.26485 21.1605 3.04917C20.7232 2.86803 20.2447 2.83902 19.4165 2.83438ZM11.7498 18.4168C11.7498 17.8645 12.1976 17.4168 12.7498 17.4168L21.2498 17.4168C21.8021 17.4168 22.2498 17.8645 22.2498 18.4168C22.2498 18.9691 21.8021 19.4168 21.2498 19.4168L12.7498 19.4168C12.1976 19.4168 11.7498 18.9691 11.7498 18.4168ZM12.7498 23.0835C12.1976 23.0835 11.7498 23.5312 11.7498 24.0835C11.7498 24.6358 12.1976 25.0835 12.7498 25.0835H18.4165C18.9688 25.0835 19.4165 24.6358 19.4165 24.0835C19.4165 23.5312 18.9688 23.0835 18.4165 23.0835H12.7498Z" fill="white"/>
</svg>

    <h6 class="mb-0 fw-bold">Contribution</h6>
  </div>
</div>

<!-- Uploads and Liked Posts -->
<div
  class="d-flex rounded-bottom "
  style="border-top: 1px solid #000; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"
>
  <!-- Uploads Section -->
  <div
    class="w-50 p-4 text-center"
    style="border-right: 1px solid #000; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"
  >
    <p class="h4 mb-0 fw-bold">10</p>
    <h6 class="mb-0">Uploads</h6>
  </div>

  <!-- Liked Posts Section -->
  <div class="w-50 p-4 text-center">
    <p class="h4 mb-0 fw-bold">30</p>
    <h6 class="mb-0">Liked Post</h6>
  </div>
</div>





  
            <!-- Recent Posts Section -->
            <h5 class=" mt-4 mb-3">Recent Post</h5>
            <div class="row">
  <div
    class="col-4 mb-3"
    v-for="(post, index) in recentPosts"
    :key="index"
  >
    <!-- Card Wrapper -->
    <a 
      :href="'/post/' + post.id" 
      class="card p-3 text-center text-decoration-none" 
      style="border-radius: 15px; display: block;"
    >
      <!-- SVG Icon -->
      <div class="d-flex justify-content-center align-items-center" style="height: 160px;">
        <img 
          src="/public/images/File_light.svg" 
          class="card-img-top" 
          style="width: 140px; height: 160px;" 
          alt="File Icon"
        >
      </div>
      <!-- Title -->
      <h6 class="mb-1 text-dark">{{ post.title }}</h6>
      <!-- Description -->
      <p class="text-muted small">{{ post.description }}</p>
    </a>
  </div>
</div>

            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
export default {
  data() {
    return {
      profileImage: "https://via.placeholder.com/120", // Ganti dengan URL foto profil
      name: "Ozza Afreza",
      university: "Politeknik Negeri Bali",
      department: "Teknologi Informasi",
      uploads: 10,
      likedPosts: 30,
      recentPosts: [
        {
          image: "https://via.placeholder.com/60",
          title: "Makalah",
          description: "Review dan Analisis...",
        },
        {
          image: "https://via.placeholder.com/60",
          title: "Makalah",
          description: "Review dan Analisis...",
        },
        {
          image: "https://via.placeholder.com/60",
          title: "Makalah",
          description: "Review dan Analisis...",
        },
      ],
    };
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

body {
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.text-white {
  color: #fff !important;
}

.card h5,
.card h6 {
  font-weight: bold;
}

.text-muted {
  font-size: 0.9rem;
}

/* .d-flex.align-items-center h6 {
  margin-bottom: 0;
} */

h5.text-center {
  font-weight: bold;
}

.me-3 img {
  object-fit: contain;
}
</style>
