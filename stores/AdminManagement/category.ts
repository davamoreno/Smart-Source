import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";


export const useCategoryStore = defineStore('Category', () => {
    const isLoading = ref(false);
    const error = ref(null);
    const name = ref('');
    const categories = ref([]);
    const currentPage = ref(1);
    const perPage = ref(5);
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const maxVisiblePages = 5; 
    const url = 'http://localhost:8000/api/';

    async function getCategories(page = 1) {
        try {
            isLoading.value = true;
            error.value = null;

            const response = await axios.get(`${url}get/categories?page=${page}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            categories.value = response.data.data;
            totalItems.value = response.data.total;
            currentPage.value = page;
        } catch (err) {
            error.value = err.response?.data?.message || 'Error fetching categories';
        } finally {
            isLoading.value = false;
        }
    }

    const visiblePages = computed(() => {
        const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    function changePage(page : any) {
        if (page >= 1 && page <= totalPages.value) {
            getCategories(page);
        }
    }

    async function createCategory(){
        try{
            isLoading.value = true;
            error.value = null;

            const response = await axios.post(`${url}category`, {
                name : name.value
            },
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${useCookie('jwt').value}`
                }
            }
        )
        return response.data;
        }catch(err){
            return error.value = err.response?.data?.message || 'Error creating category'
        }finally{
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        name,
        error,
        createCategory,
        categories,
        currentPage,
        totalPages,
        visiblePages,
        changePage,
        perPage,
        totalItems,
        getCategories,
    }
});