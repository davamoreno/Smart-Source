<template>
  <div>
    <!-- Trigger Modal -->
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#completeProfileModal">
      New Post
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="completeProfileModal"
      tabindex="-1"
      aria-labelledby="completeProfileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal">
          <div class="modal-body text-center p-4">
            <!-- Title -->
            <h2 class="fw-bold mb-3">Complete your Profile first</h2>
            <!-- Description -->
            <p class="text-muted mb-4">
              You can’t create a post if you don’t complete your profile yet
            </p>
            <!-- Buttons -->
            <div class="d-grid gap-2">
              <button class="btn btn-dark btn-lg" @click="goToEditProfile">
                Go to Edit Profile
              </button>
              <button class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToEditProfile() {
      this.$router.push('/member/editprofile');
    },

  },
};
</script>

<style scoped lang="scss">
.custom-modal {
  width: 328px; // Lebar modal
  height: 260px; // Tinggi modal
  border-radius: 16px;
  background-color: #e9ecef; // Warna abu-abu terang
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  margin: 0 auto; // Agar modal selalu di tengah
}

.modal-body {
  padding: 20px; // Mengurangi padding agar sesuai dengan ukuran kecil
}

h2 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
}

p {
  font-size: 0.875rem;
  color: #6c757d; // Warna abu-abu terang
}

button {
  border-radius: 8px;
  height: 44px; // Tinggi tombol
  font-size: 0.875rem; // Ukuran font tombol
}
.btn-dark {
  background-color: #000;
  color: #fff;
}

.btn-outline-dark {
  border: 2px solid #000;
}
</style>