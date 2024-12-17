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

  function setLoginStatus(status: boolean) {
    isLogin.value = status;
  }

  async function register() { 
    try {
      isLoading.value = true;
      error.value = null;

      const response = await axios.post('http://localhost:8000/api/member/register', {
        Headers : {
          'content-type' : 'application/json'
        },
        username: username.value,
        email: email.value,
        password: password.value,
      });

      console.log('Registration successful:', response.data);
    } catch (err) {
      console.log(err, 'error');
  }
};

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
    console.log('cookie', cookieToken.value);
    console.log('Login Success', response.data, cookieToken.value);
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

    console.log('user', userProfile.value);
  }
  catch(err){
    console.log(err, 'error')
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
  getUserProfile
}
});