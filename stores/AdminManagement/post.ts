import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";

export const postAdminStore = defineStore('postAdminStore', () => {
    const file = ref([]);
    const posts = ref([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const maxVisiblePages = 10;
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const status = ref('');
    const url = "http://127.0.0.1:8000/api/";


    async function getPendingPost(page = 1){
        try {
            const response = await axios.get(`${url}post/pending?page=${page}`, {
                headers : {
                    "Accept" : "application/json",
                    "Authorization" : `Bearer ${useCookie('jwt').value}`
                }
            });
            posts.value = response.data.data;
            totalItems.value = response.data.total;
            currentPage.value = page;
        } catch (error) {
            return console.log('error', error);
        } finally{
            
        }
    }

    const visiblePages = computed(() => {
        const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    function changePage(page : any) {
        if (page >= 1 && page <= totalPages.value) {
            getPendingPost(page);
        }
    }


    async function postValidation(id : number){
        try {
            const response = await axios.put(`${url}post/validation?id=${id}`, {
                status : status.value
            },
            {
               headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${useCookie('jwt').value}`
               } 
            }
        )

            console.log('response', response.data.post.status);
        } catch (error) {
            console.error('err', err.response ? err.response.data.post.status : err);
        }
    }

    return{
        posts,
        getPendingPost,
        currentPage,
        totalPages,
        visiblePages,
        changePage,
        perPage,
        totalItems,
    }
});