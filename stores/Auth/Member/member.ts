import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';
import { useUrlStore } from '~/stores/BaseUrl/Url';


export const useMemberAuthStore = defineStore('memberAuth', () => {
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const identifier = ref('');
  const isLoading = ref(false);
  const error = ref(null);
  const token = ref(null);
  const isLogin = ref();
  const userProfile = ref({});
  const success = ref(false);
  const role = ref(null);
  const urlStore = useUrlStore();
  const selectedUniversity = ref('');
  const selectedFaculty = ref('');

  function setLoginStatus(status: boolean) {
    isLogin.value = status;
  }

  async function register() {
    try {
      isLoading.value = true;
      error.value = null;
      success.value = false;
      
      const response = await axios.post(`${urlStore.url}member/register`, {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      if (confirmPassword.value != password.value) {
        error.value = {confirmPassword : ['password confirmation is not macth with your password.']};
        return;
      }

      console.log('Registration successful:', response.data);
      username.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (err) {
      if (err.response && err.response.status === 422) {
        error.value = err.response.data.errors;
        success.value = false;
      }
      else {
        error.value = 'An unexpected error occurred. Please try again.';
      }
      } finally {
        success.value = true;
        isLoading.value = false;
      }
  }

async function login() {
  try{
    isLogin.value = false;
    isLoading.value = true;
    error.value = null;

    if (!identifier.value || !password.value) {
      throw new Error('Identifier and password are required');
    }

    const response = await axios.post(`${urlStore.url}member/login`, {
      identifier: identifier.value,
      password: password.value,
    },
    {
      headers : {
        'Content-Type' : 'application/json',
      }
    },
  );

    token.value = response.data.access_token;
    role.value = response.data.role;
    setLoginStatus(true);   
    const cookieToken = useCookie('jwt', { maxAge: 60 * 60 * 24 });
    cookieToken.value = token.value;
    identifier.value = '';
    password.value = '';
  }
  catch(err){
    if (err.response && err.response.status === 422) {
      error.value = err.response.data.errors;
    }
    else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
  }finally{
    isLoading.value = false;
  }
};

async function getUserProfile(){
  try{
    isLogin.value = true;
    const response = await axios.get(`${urlStore.url}user/profile`, {
      headers : { 
        'Authorization' : `Bearer ${useCookie('jwt').value}`
      }
    })
    userProfile.value = response.data;
  }
  catch(err){
    console.log(err, 'error')
  }
}

async function logout() {
  try{
    isLogin.value = false;
    const response = await axios.post(`${urlStore.url}member/logout`, {},
    {
      headers : {
        Authorization : `Bearer ${useCookie('jwt').value}`
      },
    }
  );
  const cookieToken = useCookie('jwt');
  cookieToken.value = null;
  token.value = null;
  setLoginStatus(false);
  userProfile.value = {};
  isLogin.value = false;
  console.log('logout success');
  }catch(err){
    console.log('err', err);
  }
}
async function updateProfile() {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await axios.post(`${urlStore.url}user/edit/profile`,
      {
        username: username.value,
        faculty_id: selectedFaculty.value,
      },
      {
        headers: {
          Authorization: `Bearer ${useCookie('jwt').value}`,
        },
      }
    );

    userProfile.value = response.data.user;
    console.log('Profile updated successfully:', response.data);

    success.value = true;
  } catch (err) {
    if (err.response && err.response.status === 422) {
      error.value = err.response.data.errors;
    } else if (err.response && err.response.status === 401) {
      error.value = 'User not authenticated.';
    } else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
    success.value = false;
  } finally {
    isLoading.value = false;
  }
}


return {
  setLoginStatus,
  register,
  username,
  email,
  password,
  confirmPassword,
  login,
  identifier,
  token,
  isLogin,
  isLoading,
  error,
  success,
  userProfile,
  getUserProfile,
  logout,
  updateProfile,
  selectedFaculty,
  selectedUniversity
}
});