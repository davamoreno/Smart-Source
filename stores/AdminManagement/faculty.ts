import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import axios from "axios";
import { useUrlStore } from "../BaseUrl/Url";

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
    const urlStore = useUrlStore();

    async function createFaculty(){
        try{
            error.value = null;

            const response = await axios.post(`${urlStore.url}faculty`, {
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
    }

    async function getFaculty(page = 1){
        try{
            error.value = null;
    
            const response = await axios.get(`${urlStore.url}get/faculties?page=${page}`,
            {
                headers : {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${useCookie('jwt').value}`
                },
            }
        )
        faculty.value = response.data.data;
        totalItems.value = response.data.total;
        currentPage.value = page;
        }catch(err){
    
        }
    }

    return {
        createFaculty,
        selectedUniversity,
        name,
        getFaculty,
        faculty,
        perPage,
        currentPage
    }
});