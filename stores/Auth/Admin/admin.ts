import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useCookie } from "#app";

export const useAdminAuthStore = defineStore('adminAuth', () => {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const identifier = ref('');
    const token = ref(null);
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const error = ref(null);
    const role = ref(null);
    const isLogin = ref(false);
    const adminProfile = ref({});
    const url = 'http://localhost:8000/api/';

    function setLoginStatus(status: boolean) {
        isLogin.value = status;
    }

    async function createAdmin() {
        try{
            isLoading.value = true;
            error.value = null;
            isSuccess.value = false;
            
            let response = await axios.post(`${url}admin/register`, {
                username : username.value,
                email : email.value,
                password : password.value,
                confirmPassword : confirmPassword.value
            },
            {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${useCookie('jwt').value}`,
                }
            });

            if (confirmPassword.value != password.value) {
                error.value = {confirmPassword : ['password confirmation is not macth with your password.']};
                return;
            }
            isSuccess.value = true;
            username.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
        }
        catch(err){ 
            if (err.response && err.response.status === 422){
                error.value = err.response.data.errors;
            }
          else {
            error.value = 'An unexpected error occurred. Please try again.';
          }
        } finally {
          isLoading.value = false;
        }
        
    }

   async function adminLogin() {
    try{
        isLoading.value = true;
        error.value = null;

        const response = await axios.post(`${url}admin/login`, {
                identifier : identifier.value,
                password : password.value,
            },
            {
                headers : {
                    'Content-Type' : 'application/json',
                }
            },
        );

        //Ini Untuk Menyimpan Data User(token, role)
        token.value = response.data.access_token;
        role.value = response.data.role;
        isLogin.value = true;

        //Memasukkan Token kedalam cookie
        const cookieToken = useCookie('jwt', { maxAge: 60 * 60 * 24 });
        cookieToken.value = token.value;

        }catch(err){
            console.error('err', err.response ? err.response.data : err);
        }finally{
            isLoading.value = false;
        }
    }

    async function getAdminProfile(){
        try{
          const response = await axios.get(`${url}admin/profile`, {
            headers : {
              'Authorization' : `Bearer ${useCookie('jwt').value}`
            },  
          })
          
          adminProfile.value = response.data;
          console.log('admin',  response.data);
        }
        catch(err){
          console.log(err, 'error')
        }
    }

    async function logout() {
        try{
          const response = await axios.post(`${url}admin/logout`, 
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
        adminProfile.value = {};
        role.value = null;

        console.log('logout success');
        }catch(err){
          console.log('err', err);
        }
      }
      
    return {
        setLoginStatus,
        createAdmin,
        username,
        email,
        password,
        identifier,
        confirmPassword,
        isLoading,
        isLogin,
        isSuccess,
        error,
        token,
        role,
        adminLogin,
        adminProfile,
        getAdminProfile,
        logout
      };
});  