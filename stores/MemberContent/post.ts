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
    const isLiked = ref(false);
    const reason = ref('');
    const report = ref('');
    const userPost = ref([]);
    const status = ref('');

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
    async function showPostDetail(id : number) {
        try {
            const response = await axios.get(`${url}user/post/${id}`,{
                headers : {
                    Authorization : `Bearer ${useCookie('jwt').value}`
                }
            });
            postDetail.value = response.data[0];
        } catch (error) {
            console.error('Error fetching post detail:', error);
        }
    }
    async function createLike(id : number) {
        try {
            if (postDetail.value && postDetail.value.id === id) {
                postDetail.value.like = true;
                postDetail.value.likes_count += 1;
            }
            const response = await axios.post(`${url}post/like/${id}`, {}, {
                headers : {
                    Authorization : `Bearer ${useCookie('jwt').value}`
                }
            });
            const updatedPost = response.data;
            
         
    
            console.log('Like Successful:', response.data.message);
        }catch (error) {
            if (postDetail.value && postDetail.value.id === id) {
                postDetail.value.like = false;
                postDetail.value.likes_count -= 1;
            }
            console.error('Error Message:', error.message);
        }finally{
            isLiked.value = true
        }
    }
    async function deleteLike(id : number) {
        try {
            if (postDetail.value && postDetail.value.id === id) {
                postDetail.value.like = false;
                postDetail.value.likes_count -= 1;
            }
            const response = await axios.post(`${url}post/like/${id}`, {}, {
                params : {
                    '_method' : 'delete'
                },
                headers : {
                    Authorization : `Bearer ${useCookie('jwt').value}`
                }
            });
            const updatedPost = response.data;
            console.log('Like Successful:', response.data.message);
        }catch (error) {
            if (postDetail.value && postDetail.value.id === id) {
                postDetail.value.like = true;
                postDetail.value.likes_count += 1;
            }
                console.error('Error Message:', error.message);
        }finally{
            isLiked.value = false;
        }
    }

    async function createReport(id : number){
        try{
            const formData = new FormData();
            formData.append('reason', reason.value);
          
            const response = await axios.post(`${url}post/report/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`,
                }
            });
            report.value = response.data;
        }
        catch{
            
        }
    }

    async function myPost() {
        try {
            const response = await axios.get(`${url}user/mypost`, {
                headers: {
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                }
            });
            
            // Pastikan response.data.posts sesuai dengan format yang dikirimkan API
            if (response.data.posts) {
                userPost.value = response.data.posts;
                console.log('response :', response.data);
            } else {
                console.log('No posts found');
            }
        } catch (error) {
            // Menangani error dengan lebih spesifik
            if (error.response) {
                // Server merespon dengan status error
                console.error('Error Response Data:', error.response.data);
                console.error('Error Response Status:', error.response.status);
            } else if (error.request) {
                // Tidak ada respons dari server
                console.error('Error Request:', error.request);
            } else {
                // Masalah lain saat pengaturan request
                console.error('Error Message:', error.message);
            }
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
        postDetail,
        createLike,
        deleteLike,
        isLiked,
        createReport,
        reason,
        report,
        myPost,
        userPost,
        status
    };
});
