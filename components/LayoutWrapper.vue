<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { useNuxtApp } from '#app';

// Store
const memberAuthStore = useMemberAuthStore();
const { $bootstrap } = useNuxtApp();
const router = useRouter();

// State
const isNavOpen = ref(false);
const isLogin = ref(false);

// Methods
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const handleRegister = async () => {
  try {
    await memberAuthStore.register();
    const modal = document.getElementById('createAccountModal');
    const bootstrapModal = $bootstrap.Modal.getInstance(modal);

    if (memberAuthStore.success) {
      bootstrapModal?.show();
    } else {
      bootstrapModal?.hide();
      const loginModalEl = document.getElementById('loginAccountModal');
      const loginModal = new $bootstrap.Modal(loginModalEl);
      loginModal.show();
    }
  } catch (error) {
    console.error("Error during registration:", error);
    const modal = document.getElementById('createAccountModal');
    const bootstrapModal = $bootstrap.Modal.getInstance(modal);
    bootstrapModal?.show();
  }
};

const handleLogin = async () => {
  try {
    await memberAuthStore.login();
    if (memberAuthStore.isLogin) {
      const modal = document.getElementById('loginAccountModal');
      const bootstrapModal = $bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();

      await memberAuthStore.getUserProfile();
      router.push('/member/home');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// On Mounted
onMounted(() => {
  const cookieToken = useCookie('jwt').value;
  if (cookieToken) {
    memberAuthStore.getUserProfile();
    memberAuthStore.isLogin = true;
  } else {
    console.log('Token tidak ditemukan, user belum login');
  }
});
</script>


<template>
<div class="page-container">
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
              <NuxtLink to="/member/home" class="nav-link" aria-current="page">Home</NuxtLink>
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/member/categorypage" class="nav-link">Categories</NuxtLink>
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/member/paperpage" class="nav-link">Papers</NuxtLink>
            </li>
            <li class="nav-item me-4">
              <NuxtLink to="/member/about-us" class="nav-link">About Us</NuxtLink>
            </li>
          </ul>
          <div v-if="memberAuthStore.isLogin === true">
            <div class="navbar-container container-fluid"></div>
          </div>
          <div
            class="d-flex navbar-btn"
            style="margin-left: 100px;"
            v-if="!memberAuthStore.isLogin">
            <a
              class="btn me-auto btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#loginAccountModal">Sign In
            </a>
            <a
              class="btn ms-4 btn-outline-dark"
              style="margin-right: 100px;"
              data-bs-toggle="modal"
              data-bs-target="#createAccountModal">Sign Up</a>
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
                    <div v-if="memberAuthStore.error?.identifier" class="text-danger">
                        {{ memberAuthStore.error.identifier[0] }}
                     </div>
                    <UIInput  id="password" label="Password" type="password" placeholder="Enter your password" v-model="memberAuthStore.password" />
                     <div v-if="memberAuthStore.isLoading" class="text-danger">
                     <UIBlueRoundedButton disabled>
                       Processing your request...
                     </UIBlueRoundedButton>
                   </div>
                   <div v-else class="d-flex justify-content-center">
                     <UIBlueRoundedButton type="submit">
                        Login
                     </UIBlueRoundedButton>
                   </div>
                   <div
                     v-if="
                       !memberAuthStore.isLoading &&
                       memberAuthStore.isLogin &&
                       !memberAuthStore.error
                     "
                     class="text-success mt-2">
                      Login Successfully!
                  </div>
                </form>
              </div>
              <div class="d-flex justify-content-center">
                <p>Don't Have An Account?<a  data-bs-toggle="modal" data-bs-target="#createAccountModal"><span style="color: blue;">Sign Up</span></a></p>
              </div>
            </div>
          </div>
      </div>
      <div class="modal fade" id="createAccountModal" tabindex="-1" aria-labelledby="createAccountModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-2" id="createAccountModalLabel">Create an account</h1>
                <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="d-flex justify-content-center modal-body">
                <form @submit.prevent="handleRegister">
                    <UIInput id="username" label="Username" placeholder="Enter your username" v-model="memberAuthStore.username" />
                    <div v-if="memberAuthStore.error?.username" class="text-danger">
                        {{ memberAuthStore.error.username[0] }}
                     </div>
                    <UIInput id="email" label="Email address" type="email" placeholder="Enter your email address" v-model="memberAuthStore.email" />
                    <div v-if="memberAuthStore.error?.email" class="text-danger">
                        {{ memberAuthStore.error.email[0] }}
                     </div>
                    <UIInput id="password" label="Password" type="password" placeholder="Enter your password" v-model="memberAuthStore.password" />
                    <div v-if="memberAuthStore.error?.password" class="text-danger">
                        {{ memberAuthStore.error.password[0] }}
                     </div>
                    <UIInput id="confirmPassword" label="Confirm Password" type="password" placeholder="Enter your password" v-model="memberAuthStore.confirmPassword" />
                    <div v-if="memberAuthStore.error?.confirmPassword" class="text-danger">
                        {{ memberAuthStore.error.confirmPassword[0] }}
                    </div>
                    <div v-if="memberAuthStore.isLoading" class="text-danger">
                     <UIBlueRoundedButton disabled>
                       Processing your request...
                     </UIBlueRoundedButton>
                   </div>
                   <div v-else class="d-flex justify-content-center">
                     <UIBlueRoundedButton type="submit">
                       Create account
                     </UIBlueRoundedButton>
                   </div>
                   <div
                     v-if="
                       !memberAuthStore.isLoading &&
                       memberAuthStore.success &&
                       !memberAuthStore.error
                     "
                     class="text-success mt-2">
                  Account created successfully!
                  </div>
                </form>
              </div>
              <div class="d-flex justify-content-center">
                <p>Already Have An Account? <a data-bs-toggle="modal" data-bs-target="#loginAccountModal"><span style="color: blue;">Sign In</span></a></p>
              </div>
            </div>
          </div>
      </div>
    <main>
      <slot />
    </main>
    <footer class="footer d-flex justify-content-center bg-dark py-3">
      <p class="text-white justify-content-center">&copy; 2025 Smart Source</p>
    </footer>
  </div>
  </template>
  
<style scoped lang="scss">
main {
  flex: 1;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
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
  [v-cloak] {
    display: none;
  }

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

      .footer {
        flex-direction: column;
        align-items: center;
        background-color: #000;
        color: #fff;
        text-align: center;
        padding: 1rem 0;
        margin-top: auto; /* Dorong footer ke bawah */
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