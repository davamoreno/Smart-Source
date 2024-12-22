import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";


export const useCategoryStore = defineStore('Category', () => {
    const isLoading = ref(false);
    const error = ref(null);
    const name = ref('');
    const url = 'http://localhost:8000/api/';

    async function createCategory(){
        try{
            isLoading.value = true;
            error.value = null;

            const response = await axios.post(`${url}category`, {
                name : name.value
            },
            {
                headers : {
                    "Content-Type" : "application/json"
                }
            }
            
        )
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
        createCategory
    }
});