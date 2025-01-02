import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";

export const usefacultyStore = defineStore('faculty', () => {
    const selectedUniversity = ref('');
    const name = ref('');
    const error = ref(null);
    const faculty = ref([]);
    const currentPage = ref(1);
    const perPage = ref(5);
    const maxVisiblePages = 5;
    const totalItems = ref(0);
    const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
    const url = "http://127.0.0.1:8000/api/";

async function createFaculty(){
    try{
        error.value = null;

        const response = await axios.post(`${url}faculty`, {
            name : name.value,
            university_id: selectedUniversity.value,
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
    }});