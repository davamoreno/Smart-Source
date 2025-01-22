<script setup>
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'blank',
});

const admin = useAdminAuthStore();
const router = useRouter();

const isLoading = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
const showNotification = ref(false);
const usernameError = ref(false);

const handleRegister = async () => {
  // Validasi username kosong
  if (!admin.username || admin.username.trim() === '') {
    usernameError.value = true;
    showAlert('Username cannot be empty!', 'danger');
    return;
  } else {
    usernameError.value = false;
  }

  // Validasi confirm password
  if (admin.password !== admin.confirmPass) {
    showAlert('Password confirmation does not match!', 'danger');
    return;
  }

  try {
    isLoading.value = true;

    // Simpan data admin
    await admin.createAdmin();

    // Berhasil membuat admin
    showAlert('Admin created successfully!', 'success');
    setTimeout(() => {
      router.push('/admin/dashboard'); // Redirect ke dashboard setelah 3 detik
    }, 3000);
  } catch (err) {
    console.error('Failed to create admin:', err);
    showAlert('Failed to create admin. Please check your input.', 'danger');
  } finally {
    isLoading.value = false;
  }
};

const showAlert = (message, type) => {
  notificationMessage.value = message;
  notificationType.value = type; // 'success' atau 'danger'
  showNotification.value = true;

  // Sembunyikan notifikasi setelah 3 detik
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

const hideErrorMessage = () => {
  usernameError.value = false;
};
</script>

<template>
  <div class="admin-layout">
    <AdminSideBar />
    <div class="content bg-light">
      <h1>Create Admin</h1>

      <!-- Notifikasi -->
      <div
        v-if="showNotification"
        :class="['notification', notificationType === 'success' ? 'success' : 'danger']"
      >
        {{ notificationMessage }}
      </div>

      <form class="admin-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            v-model="admin.username"
            @input="hideErrorMessage"
          />
          <span v-if="usernameError" class="text-danger">Username cannot be empty!</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter Email" v-model="admin.email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" v-model="admin.password" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            v-model="admin.confirmPass"
          />
        </div>

        <button class="btn-submit" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Add Admin</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;

  .content {
    flex: 1;
    padding: 16px;

    .admin-form {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .form-group {
        display: flex;
        flex-direction: column;

        label {
          font-weight: bold;
          margin-bottom: 8px;
        }

        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }

      .btn-submit {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .notification {
      padding: 10px;
      margin-bottom: 16px;
      border-radius: 4px;
      text-align: center;

      &.success {
        background-color: #d4edda;
        color: #155724;
      }

      &.danger {
        background-color: #f8d7da;
        color: #721c24;
      }
    }
  }
}
</style>
