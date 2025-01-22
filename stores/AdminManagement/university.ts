import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";
import { useUrlStore } from "../BaseUrl/Url";

export const useUniversityStore = defineStore('University', () => {
    const name = ref('');
    const error = ref(null);
    const universities = ref([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const maxVisiblePages = 5;
    const totalItems = ref(0);
    const isLoading = ref(true);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const urlStore = useUrlStore();

    const visiblePages = computed(() => {
        const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    function changePage(page: any) {
        if (page >= 1 && page <= totalPages.value) {
            getUniversity(page);
        }
    }


async function createUniversity(){
    try{
        isLoading.value = true;
        error.value = null;

        const response = await axios.post(`${urlStore.url}university`, {
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
async function getUniversity(page = 1){
    try{
        error.value = null;

        const response = await axios.get(`${urlStore.url}get/universities?page=${page}`,
        {
            headers : {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${useCookie('jwt').value}`
            },
        }
    )
    universities.value = response.data.data;
    totalItems.value = response.data.total;
    currentPage.value = page;
    }catch(err){

    }
}
async function deleteUniversity(id: number){
    try{
        error.value = null;

        const response = await axios.delete(`${urlStore.url}delete/university/${id}`,
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
    universities,
    error,
    getUniversity,
    createUniversity,
    deleteUniversity,
    isLoading,
    changePage,
    visiblePages,
    currentPage,
    maxVisiblePages,
    totalItems,
    totalPages,
    perPage
}


});