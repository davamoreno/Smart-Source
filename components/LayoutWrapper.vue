<script setup>
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

const memberAuthStore = useMemberAuthStore();

const handleLogin = () =>{
  memberAuthStore.login();
}

</script>

<template>
    <nav class="navbar navbar-expand-lg">
      <div class="navbar-container container-fluid">
        <a class="navbar-brand">
          <img src="/assets/images/logo.svg" alt="" class="navbar-icon"> 
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-list collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li class="nav-item me-4 ">
              <NuxtLink to="/" class="nav-link " aria-current="page">Home</NuxtLink> 
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/Categories" class="nav-link " aria-current="page">Categories</NuxtLink> 
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/papers" class="nav-link " aria-current="page">Papers</NuxtLink> 
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/about-us" class="nav-link ">About Us</NuxtLink> 
            </li>
            </ul>
          <div class="d-flex navbar-btn" style="margin-left: 100px;">
            <button class="btn me-auto btn-primary" data-bs-toggle="modal" data-bs-target="#loginAccountModal">
              <NuxtLink class="nav-link">Sign In</NuxtLink> 
            </button>
            <button class="btn ms-4 btn-outline-primary" style="margin-right  : 100px;" data-bs-toggle="modal" data-bs-target="#createAccountModal">
              <NuxtLink class="nav-link">Sign Up</NuxtLink> 
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="loginAccountModal" tabindex="-1" aria-labelledby="loginAccountModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-2" id="createAccountModalLabel">Login to your account</h1>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="d-flex justify-content-center modal-body">
              <form @submit.prevent="handleLogin">
                  <UIInput id="identifier" label="Username/Email Address" type="text" placeholder="Enter your username or email address" v-model="memberAuthStore.identifier" />  
                  <UIInput id="password" label="Password" type="password" placeholder="Enter your password" v-model="memberAuthStore.password" />
                  <div class="d-flex justify-content-center"> 
                    <UIBlueRoundedButton type="submit">
                        Login
                    </UIBlueRoundedButton>
                  </div>
              </form>
            </div>
            <div class="d-flex justify-content-center">
              <p>Don't Have An Account? <a href="#"><span style="color: blue;">Sign In</span></a></p>
            </div>
          </div>
        </div>
    </div>
    <main>
      <slot /> 
    </main>
    <footer class="d-flex justify-content-center bg-primary py-3">
      <p class="text-white mb-0">&copy; 2023 Smart Source</p>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style lang="scss">
  .navbar {
    background-color: #ffefef;
    border-bottom: 1px solid black;
  
    &-container {
      margin-left: 98px;
    }
  
    &-list {
      ul {
        li {
          a {
            font-family: 'Poppins';
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;
            color: black;
        }
          a:hover {
              color:red;
              cursor: pointer;
          }
        }
      }
    }
  
    &-btn {
      button {
        width: 90px;
        height: 33px;
        &:hover {
          background-color: red;
          cursor: pointer;
        }
      }
  
      a {
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 14px;
        text-decoration: none;
        color: inherit; 
      }
    }
  }

  .modal-content{
  background-color:#D9D9D9;
  h1{
    margin-left: 20px;
    font-size: 288px;
    height: 45px;
  }
  a{
    text-decoration: none;
  }
}
  </style>