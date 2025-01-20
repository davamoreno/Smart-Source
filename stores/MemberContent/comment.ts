import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app';
import { useUrlStore } from '../BaseUrl/Url';

export const useCommentStore = defineStore('commentPost', {
    state: () => {
        return{
            urlStore : useUrlStore(),
            content: ref(''),
            isLoading: ref(false)
        }
    },
    actions: {
        async get(){

        },
        async create(id : number){
            try {
                this.isLoading = true;
                const response = await axios.post(`${this.urlStore.url}post/comment/${id}`, {
                    content : this.content,
                },
                {
                    headers : {
                        "Authorization" : `Bearer ${useCookie('jwt').value}`,
                        "Content-Type" : "application/json"
                    }
                }
            )
            console.log('comment success', response.data)
            } catch (error) {
                
            }
        }
    }
});