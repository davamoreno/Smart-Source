import { defineStore } from 'pinia';

export const useUrlStore = defineStore('UrlStore', {
  state: () => {
    return{
        url : 'http://127.0.0.1:8000/api/'
        }
    }
});
