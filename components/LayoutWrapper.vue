<script setup>
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const { $bootstrap } = useNuxtApp();

const memberAuthStore = useMemberAuthStore();
const router = useRouter();

const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

async function handleLogin() { 
  try {
    await memberAuthStore.login();

    if (memberAuthStore.isLogin) {
      console.log('Login successful!');
      const modal = document.getElementById('loginAccountModal');
      const bootstrapModal = $bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
      
      await memberAuthStore.getUserProfile(); 
      navigateTo('/home');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}

await handleLogin();

onMounted(() => {
  const cookieToken = useCookie('jwt');
  if (cookieToken.value) {
    console.log('Token ditemukan:', cookieToken.value);
    memberAuthStore.isLogin = true;
    memberAuthStore.getUserProfile();
          router.push('/home');
  } else {
    console.log('Token tidak ditemukan, user belum login');
  }
});

</script>

<template>
    <nav class="navbar navbar-expand-lg">
    <div class="navbar-container container-fluid">
      <a class="navbar-brand">
        <img src="/assets/images/logo.svg" alt="" class="navbar-icon" />
      </a>
      <div
        class="hamburger"
        :class="{ active: isNavOpen }"
        @click="toggleNav">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        class="navbar-list collapse navbar-collapse"
        :class="{ show: isNavOpen }"
        id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-4">
            <NuxtLink to="/" class="nav-link" aria-current="page">Home</NuxtLink>
          </li>
          <li class="nav-item me-4">
            <NuxtLink to="/Categories" class="nav-link">Categories</NuxtLink>
          </li>
          <li class="nav-item me-4">
            <NuxtLink to="/papers" class="nav-link">Papers</NuxtLink>
          </li>
          <li class="nav-item me-4">
            <NuxtLink to="/about-us" class="nav-link">About Us</NuxtLink>
          </li>
        </ul>
        <div
          class="d-flex navbar-btn"
          style="margin-left: 100px;"
          v-if="!memberAuthStore.isLogin">
          <a
            class="btn me-auto btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#loginAccountModal">Sign In
          </a>
          <a
            class="btn ms-4 btn-outline-primary"
            style="margin-right: 100px;"
            data-bs-toggle="modal"
            data-bs-target="#createAccountModal">Sign Up</a>
        </div>
        <div v-else>
    
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
  
<style scoped lang="scss">
  .navbar {
    background-color: #ffefef;
    border-bottom: 1px solid black;
  
    &-btn {
      a:hover {
        background-color: red;
      }
      a:active {
        background-color: red;
      }
    }
  
    &-container {
      margin-left: 98px;
  
      @media (max-width: 768px) {
        margin-left: 0;
        padding: 0 16px;
      }
    }
  
    &-list {
      ul {
        li {
          a {
            font-family: "Poppins";
            font-weight: bold;
            font-size: 14px;
            text-decoration: none;
          }
          a:hover {
            color: red;
            cursor: pointer;
          }
        }
      }
  
      // Responsiveness for navbar
      @media (max-width: 768px) {
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        background-color: #ffefef;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 10px 0;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.3s ease, opacity 0.3s ease;
  
        &.show {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
  
        ul {
          flex-direction: column;
          width: 100%;
        }
  
        li {
          padding: 10px 20px;
        }
      }
    }
  
    // Hamburger menu styles
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 25px;
      height: 20px;
      cursor: pointer;
  
      div {
        width: 100%;
        height: 3px;
        background-color: black;
        border-radius: 2px;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
  
      &.active {
        div:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
  
        div:nth-child(2) {
          opacity: 0;
        }
  
        div:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
  
      @media (max-width: 768px) {
        display: flex;
      }
    }
  }
  
.modal-content {
  background-color: #d9d9d9;
  padding: 20px;
  border-radius: 10px;

  .modal-header {
    h1 {
      font-size: 24px;
      margin: 0 auto;
      text-align: center;
    }

    .btn-close {
      margin-left: auto;
    }
  }

  .modal-body {
    flex-direction: column;
    padding: 20px;

    form {
      width: 100%;

      .d-flex {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  p {
    text-align: center;
    font-size: 14px;

    a {
      color: blue;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    .modal-header h1 {
      font-size: 20px;
    }

    .modal-body {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px;

    .modal-header h1 {
      font-size: 18px;
    }

    .modal-body {
      padding: 5px;
    }

    p {
      font-size: 12px;
    }
  }
}

  </style>