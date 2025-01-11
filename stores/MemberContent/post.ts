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
    const loading = ref(false);
    const error = ref(null);
    const url = "http://127.0.0.1:8000/api/";
    const page = ref(1);
    const pageCount = ref(1);
    const postDetail = ref();

    function clearError() {
        setTimeout(() => {
            error.value = null;
        }, 5000);
    }

    async function createPost() {
        loading.value = true;
        try {
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('description', description.value);
            formData.append('category_id', selectedCategory.value);
            formData.append('file', file.value);
            formData.append('paper_type_id', selectedPaper.value);

            const response = await axios.post(`${url}create/post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`,
                }
            });

            console.log('post:', response.data);
            posts.value.push(response.data.post);
            clearError();
        } catch (err) {
            error.value = err.response?.data?.message || 'An error occurred while creating post';
        } finally {
            loading.value = false;
        }
    }
    async function getPost() {
        loading.value = true;
        try {
            const response = await axios.get(`${url}user/post`, {
                params : {
                    page : page.value
                }
            });

            let newPosts = response.data.data;

            if (page.value > 1) {
                posts.value = [...posts.value, ...newPosts];
              } else {
                posts.value = newPosts;
              }
              page.value = response.data.current_page;
              pageCount.value = response.data.last_page;
              
        } catch (err) {
            error.value = err.response?.data?.message || 'An error occurred while showing post';
        } finally {
            loading.value = false;
        }
    }
    async function  showPostDetail(id : number) {
        try {
            const response = await axios.get(`${url}user/post/${id}`);
            console.log("Response data:", response.data); 
            postDetail.value = response.data[0];
        } catch (error) {
            console.error('Error fetching post detail:', error);
        }
    }

    function resetForm() {
        title.value = '';
        description.value = '';
        selectedCategory.value = '';
        selectedPaper.value = '';
        file.value = null;
    }

    return {
        title,
        description,
        selectedCategory,
        file,
        selectedPaper,
        posts,
        error,
        loading,
        createPost,
        resetForm,
        getPost,
        showPostDetail,
        postDetail
    };
});
