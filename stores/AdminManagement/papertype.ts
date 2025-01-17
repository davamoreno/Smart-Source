import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import { useUrlStore } from "../BaseUrl/Url";

export const usePaper = defineStore('paper', () => {
    const name = ref('');
    const error = ref(null);
    const papers = ref([]);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const perPage = ref(5);
    const maxVisiblePages = 5;
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const urlStore = useUrlStore();
    
    async function createPaper(){
        try{
            error.value = null;
            isLoading.value = true;

            const response = await axios.post(`${urlStore.url}papertype`, {
                name : name.value
            },
            {
                headers : {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                }
            }
        )
        
        const data = response.data;
        console.log("Hello", data);
        }catch(err){
            return error.value = err.response?.data;
        }finally{
            isLoading.value = false;
        }
    }
    async function getPaper(page = 1){
        try{
            error.value = null;
            isLoading.value = true;

            const response = await axios.get(`${urlStore.url}get/papertypes?page=${page}`,
            {
                headers : {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                },
            }
        )
        papers.value = response.data.data;
        totalItems.value = response.data.total;
        currentPage.value = page;
        }catch(err){

        }finally{
            isLoading.value = false;
        }
    }

    const visiblePages = computed (() => {
        const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value );

        return Array.from({length : endPage - startPage + 1}, (_, i) => startPage + i);
    });

    const changePage = (page : any) => {
        if (page >= 1 && page <= totalPages.value) {
            getPaper(page);
        }
    };

    async function deletePaper(id: number){
        try{
            error.value = null;

            const response = await axios.delete(`${urlStore.url}delete/papertype/${id}`,
            {
                headers : {
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                },
            }
        )
        }catch(err){

        }
    }

    return {
        name,
        createPaper,
        getPaper,
        papers,
        currentPage,
        totalItems,
        perPage,
        visiblePages,
        totalPages,
        changePage,
        deletePaper,
        isLoading
    }
});