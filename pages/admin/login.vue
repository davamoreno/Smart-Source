<script setup>
import Blank from '~/layouts/blank.vue';

    definePageMeta({
        layout : 'blank',
    })
</script>

<template>
    <div class="login-page d-flex justify-content-center align-items-center">
      <div class="login-container text-center">
        <div class="illustration mb-4">
          <img src="/assets/images/login.png" alt="Illustration" class="img-fluid" />
        </div>
        <form class="login-form">
          <div class="mb-3 position-relative">
            <i class="fa-solid fa-user icon"></i>
            <input
              type="text"
              class="form-control login-input"
              placeholder="USERNAME"
            />
          </div>
          <div class="mb-3 position-relative">
            <i class="fa-solid fa-lock icon"></i>
            <input
              type="password"
              class="form-control login-input"
              placeholder="PASSWORD"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 login-btn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
</template>

  <style lang="scss" scoped>
  .login-page {
    height: 100vh;
    background-color: #0046ad;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .login-container {
      background: transparent;
      padding: 20px;
      border-radius: 10px;
      width: 300px;
  
      .illustration {
        img {
          height: 200px;
          width: 200px;
        }
      }
  
      .login-form {
        .login-input {
          border: 2px solid #fff;
          border-radius: 5px;
          background: transparent;
          color: #fff;
          padding-left: 35px;
  
          &::placeholder {
            color: #fff;
            font-weight: bold;
          }
  
          &:focus {
            border-color: #ffffff;
            box-shadow: none;
          }
        }
  
        .icon {
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #ffffff;
          position: absolute;
        }
  
        .login-btn {
          margin-top: 15px;
          background-color: #ffffff;
          color: #0046ad;
          font-weight: bold;
          border: none;
  
          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
  </style>
  