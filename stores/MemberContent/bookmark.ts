import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';
import { usePostStore } from './post';
import { useUrlStore } from '../BaseUrl/Url';

export const useBookmarkStore = defineStore('bookmarkStore', {
    state: () => {
        return {
            postStore: usePostStore(),
            urlStore: useUrlStore(),
            bookmarks: ref(<any>[])
        }
    },
    actions:
    {
        async create(id: Number) {
            try {
                const response = await axios.post(`${this.urlStore.url}post/bookmark/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${useCookie('jwt').value}`
                    }
                });
                this.postStore.postDetail.bookmark = true;
                return response.data;
            } catch (error) {
                console.error('Error:', error.response || error);
                return error?.response?.data?.message || 'An error occurred';
            }
        },
        async delete(id: Number) {
            try {
                const response = await axios.post(`${this.urlStore.url}post/bookmark/${id}`, {}, {
                    params: {
                        '_method': 'delete'
                    },
                    headers: {
                        Authorization: `Bearer ${useCookie('jwt').value}`
                    }
                });
                this.postStore.postDetail.bookmark = false;
                return response.data;
            } catch (error) {
                console.error('Error:', error.response || error);
                return error?.response?.data?.message || 'An error occurred';
            }
        }, async getBookmarks() {
            try {
                const response = await axios.get(`${this.urlStore.url}post/bookmark`, {
                    headers: {
                        Authorization: `Bearer ${useCookie('jwt').value}`,
                    }
                });
                console.log(response.data)
                this.bookmarks = response?.data;
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        },
    }
});