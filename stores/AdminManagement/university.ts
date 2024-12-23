import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";

export const useUniversityStore = defineStore('University', () => {
    const name = ref('');
    const error = ref(null);
    const universities = ref([]);
    const currentPage = ref(1);
    const perPage = ref(5);
    const maxVisiblePages = 5;
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const url = "http://127.0.0.1:8000/api/";

async function createUniversity(){
    try{
        error.value = null;

        const response = await axios.post(`${url}university`, {
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
    }
}
async function getUniversity(page = 1){
    try{
        error.value = null;

        const response = await axios.get(`${url}get/universities?page=${page}`,
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

        const response = await axios.delete(`${url}delete/university/${id}`,
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
    deleteUniversity
}


});