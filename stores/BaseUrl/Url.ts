import { defineStore } from 'pinia';

export const useUrlStore = defineStore('UrlStore', {
  state: () => {
    return{
        url : 'https://smartsource.nio.my.id/api/'
        }
    }
});
