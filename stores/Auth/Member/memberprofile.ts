import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';


export const useProfileStore = defineStore('profileStore', {
    state: () => {
        return{
            user_profile: null,
            url: 'http://127.0.0.1:8000/api/'
        }
    },

    actions : {
        async createImageProfile(){
            try{
                const formData = new FormData();
               
                formData.append('user_profile', this.user_profile);

                const response = await axios.post(`${this.url}member/image`, formData, {
                    headers: {
                        'Content-Type' : 'multipart/form-data',
                        'Authorization' : `Bearer ${useCookie('jwt').value}`
                    }
                });

                console.log('Response:', response.data);
                return response.data; 
            }   
            catch(err){
                console.error('Error creating profile image:', err);
                throw err;
            }
            finally{

            }
        }
        , async getImageProfile(file : string){
            try{
               
                const response = await axios.get(`${this.url}public/storage/${file}`, {
                    headers: {
                        'Authorization' : `Bearer ${useCookie('jwt').value}`
                    }
                });
                console.log('Response:', response.data.user_profile);
                return response.data.user_profile;
            }
            catch(err){
                console.error('Error creating profile image:', err);
                throw err;
            }
            finally{

            }
        }
    }
      
    
});