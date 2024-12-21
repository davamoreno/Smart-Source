import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';


export const useMemberAuthStore = defineStore('memberAuth', () => {
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const identifier = ref('');
  const isLoading = ref(false);
  const error = ref(null);
  const token = ref(null);
  const isLogin = ref(false);
  const userProfile = ref({});
  const success = ref(false);

  function setLoginStatus(status: boolean) {
    isLogin.value = status;
  }

  async function register() {
    try {
      isLoading.value = true;
      error.value = null;
      success.value = false;

      const response = await axios.post('http://localhost:8000/api/member/register', {
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
      success.value = true;
      username.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (err) {
      if (err.response && err.response.status === 422) {
        error.value = err.response.data.errors;
      }
      else {
        error.value = 'An unexpected error occurred. Please try again.';
      }
    } finally {
      isLoading.value = false;
    }
  }

async function login() {
  try{
    isLoading.value = true;
    error.value = null;

    if (!identifier.value || !password.value) {
      throw new Error('Identifier and password are required');
    }

    const response = await axios.post('http://localhost:8000/api/member/login', {
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
    isLogin.value = true;
    const cookieToken = useCookie('jwt', { maxAge: 60 * 60 * 24 });
    cookieToken.value = token.value;
  }
  catch(err){
    console.error('err', err.response ? err.response.data : err);
  }finally{
    isLoading.value = false;
  }
};

async function getUserProfile(){
  try{
    const response = await axios.get('http://localhost:8000/api/user/profile', {
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
    const response = await axios.post('http://localhost:8000/api/member/logout', 
    {

    },
    {
      headers : {
        Authorization : `Bearer ${useCookie('jwt').value}`
      },
    }
  );
  const cookieToken = useCookie('jwt');
  cookieToken.value = null;

  token.value = null;
  isLogin.value = false;
  userProfile.value = {};

  console.log('logout success');
  }catch(err){
    console.log('err', err);
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
  userProfile,
  getUserProfile,
  logout
}
});