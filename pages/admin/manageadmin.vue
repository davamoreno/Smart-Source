<script setup>
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';

definePageMeta({
    layout : 'blank',
})

const admin = useAdminAuthStore();

const handleRegister = () => {
    admin.createAdmin();
}
</script>

<template>
    <div class="admin-layout">
      <AdminSideBar />
      <div class="content bg-light">
        <h1>Create Admin</h1>
        <form class="admin-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Enter Username" v-model="admin.username" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" v-model="admin.email"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" v-model="admin.password"/>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" v-model="admin.confirmPass"/>
          </div>
          <button type="submit" class="btn-submit">Add Admin</button>
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
  
      // Style default untuk mobile
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
    }
  }
  
  // Untuk tablet
  @media (min-width: 576px) {
    .content {
      padding: 32px;
      .admin-form {
        max-width: 540px;
      }
    }
  }
  
  // Untuk laptop
  @media (min-width: 768px) {
    .content {
      padding: 48px;
      .admin-form {
        max-width: 720px;
      }
    }
  }
  
  // Untuk desktop
  @media (min-width: 1200px) {
    .content {
      padding: 64px;
      .admin-form {
        max-width: 960px;
      }
    }
  }
  
  // Untuk layar besar (4K)
  @media (min-width: 1400px) {
    .content {
      padding: 80px;
      .admin-form {
        max-width: 1140px;
      }
    }
  }
  
  // Style untuk sidebar
  .AdminSideBar {
    width: 100%;
    background-color: #0d6efd;
    color: white;
  
    @media (min-width: 768px) {
      width: 250px;
    }
  
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
  
      li {
        padding: 10px 20px;
        cursor: pointer;
  
        &:hover {
          background-color: #084298;
        }
      }
    }
  }
  </style>  