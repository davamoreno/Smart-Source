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
  const token = useCookie('jwt');
  const isLogin = ref(false);

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
      token.value = response.data.token;

      console.log('Registration successful:', response.data, token.value);
    } catch (err) {
      console.log(err, 'error');
  }
};

async function login() {
  try{
    isLoading.value = true;
    error.value = null;

    const response = await axios.post('http://localhost:8000/api/member/login', {
      Headers : {
        'content-type' : 'application/json'
      },
      identifier: identifier.value,
      password: password.value,
    }
  );
  token.value = response.data.token;
  isLogin.value = true;
    console.log('Login Success', response.data);
  }
  catch(err){
    console.log(err, 'error');
  }
};


return {
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
  error
}
});