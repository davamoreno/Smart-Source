import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";
import { useUrlStore } from "../BaseUrl/Url";


export const useCategoryStore = defineStore('Category', () => {
    const isLoading = ref(false);
    const error = ref(null);
    const name = ref('');
    const newCategoryName = ref('');
    const categories = ref([]);
    const currentPage = ref(1);
    const perPage = ref(5);
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const maxVisiblePages = 5; 
    const urlStore = useUrlStore();

    async function getCategories(page = 1) {
        try {
            isLoading.value = true;
            error.value = null;

            const response = await axios.get(`${urlStore.url}get/categories?page=${page}`, {
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

            const response = await axios.post(`${urlStore.url}category`, {
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
    
    async function deleteCategory(id : Number) {
         try{
            error.value = null;

            const response = await axios.delete(`http://127.0.0.1:8000/api/delete/category/${id}`,
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
        deleteCategory
    }
});