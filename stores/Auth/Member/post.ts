import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';

export const usePostStore = defineStore('postStore', () => {
    const title = ref('');
    const description = ref('');
    const selectedCategory = ref('');
    const file = ref([]);
    const selectedPaper = ref('');
    const posts = ref([]);
    const url = "http://127.0.0.1:8000/api/";

    async function createPost(){
        try{
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('description', description.value);
            formData.append('category_id', selectedCategory.value);
            formData.append('file', file.value);
            formData.append('paper_type_id', selectedPaper.value);
            const response = await axios.post(`${url}create/post`, formData, {
                headers : {
                    "Content-Type": "multipart/form-data", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                }
            })

            console.log('post:', response.data);
        }catch(err){
            return error.value = err.response?.data;
        }
    }
    return{
        createPost,
        title,
        description,
        selectedCategory,
        file,
        selectedPaper,

    }
});

