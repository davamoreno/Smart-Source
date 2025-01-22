<script setup>
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';
const { $bootstrap } = useNuxtApp();

const memberAuthStore = useMemberAuthStore();
const router = useRouter();

const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

async function handleRegister() {
  try {
    await memberAuthStore.register();
    if (memberAuthStore.success === true) {
      const modal = document.getElementById('createAccountModal');
      const bootstrapModal = $bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) bootstrapModal.show();
    } else {
      const modal = document.getElementById('createAccountModal');
      const bootstrapModal = $bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) bootstrapModal.hide();

      const loginModalEl = document.getElementById('loginAccountModal');
      const loginModal = new $bootstrap.Modal(loginModalEl); 
      loginModal.show();
    }
  } catch (error) {
    console.error("Error during registration:", error);

    const modal = document.getElementById('createAccountModal');
    const bootstrapModal = $bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) bootstrapModal.show();
  }
}

async function handleLogin() { 
  try {
    await memberAuthStore.login();
    if (memberAuthStore.isLogin) {
      const modal = document.getElementById('loginAccountModal');
      const bootstrapModal = $bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
      
      await memberAuthStore.getUserProfile();
      router.push('/member/home');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>
<template>
    <div class="preview-page d-flex justify-content-center align-items-center vh-100">
      <div class="container p-5 rounded shadow-lg bg-light">
        <!-- Title -->
        <h1 class="fw-bold mb-3 text-center">This just a preview</h1>
        <p class="text-muted fs-5 text-center mb-4">
          Sign In now and get access to many posts as you want
        </p>
  
        <!-- Features -->
        <div class="features d-flex justify-content-center gap-4 mb-5">
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Read to all Posts
          </p>
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Get unlimited Downloads
          </p>
          <p class="d-flex align-items-center gap-2">
            <span class="check-icon"><img src="public/images/centang.svg" alt="" class=""/></span> Keep your Documents
          </p>
        </div>
  
        <!-- Illustration and Buttons -->
        <div class="illustration-and-buttons d-flex justify-content-center align-items-center gap-5">
          <!-- Illustration -->
          <div class="illustration-container">
            <img
              src="public/images/reader.svg"
              alt="Reader Illustration"
              class="illustration-image"
            />
          </div>
  
          <!-- Buttons Section -->
          <div class="buttons-container d-flex flex-column align-items-start gap-3">
            <button class="btn btn-dark w-100"
            data-bs-toggle="modal"
            data-bs-target="#loginAccountModal">Sign In Now</button>
            <button class="btn btn-outline-dark w-100">
              Back to previous page
            </button>
            <p class="mt-3">
              Don’t Have An Account?
              <a href="3" class="text-primary"  data-bs-toggle="modal"
              data-bs-target="#createAccountModal">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
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
              <p>Don't Have An Account?<a  data-bs-toggle="modal" data-bs-target="#createAccountModal"><span style="color: blue;">Sign Up </span></a></p>
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
  </template>
  
  <script>
  export default {
    name: "PreviewPage",
  };
  </script>
  
  <style scoped lang="scss">
  .preview-page {
    background-color: #f5f5f5;
  
    .container {
      max-width: 800px; 
      max-height: 550px;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 10px;
    }
  
    h1 {
      font-size: 28px;
      color: #333;
    }
  
    p {
      font-size: 16px;
      color: #666;
    }
  
    .features {
      p {
        font-size: 16px;
        color: #444;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
  
        .check-icon {
          font-size: 18px;
          color: #27ae60; /* Green color for checkmark */
        }
      }
    }
  
    .illustration-and-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
  
      .illustration-container {
        .illustration-image {
          width: 250px;
          height: 250px;
        }
      }
  
      .buttons-container {
        min-width: 250px;
  
        button {
          font-size: 16px;
          border-radius: 8px;
          padding: 10px;
          width: 100%;
        }
  
        p {
          font-size: 14px;
          margin: 0;
  
          a {
            color: #007bff;
            text-decoration: none;
  
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  </style>  