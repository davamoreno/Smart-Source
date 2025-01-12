import { useCookie } from '#app';
import { defineStore } from 'pinia';
import axios from 'axios';

export const postAdminStore = defineStore('postAdmin', {
  state: () => ({
    posts: [],
    url: 'http://127.0.0.1:8000/api/',
  }),
  actions: {
    async getPendingPost(page = 1) {
      try {
        const response = await axios.get(`${this.url}post/pending?page=${page}`, {
          headers: {
            "Authorization": `Bearer ${useCookie('jwt').value}`
          }
        });
        this.posts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
    updatePostStatus(id : number, status : any) {
      const post = this.posts.find(p => p.id === id);
      if (post) {
        post.status = status;
      }
    },
    async postValidation(id : number, status : any) {
      try {
        const response = await axios.post(
          `${this.url}post/validation/${id}`,
          { status },
          {
            params : {
              _method : 'put'
            },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${useCookie('jwt').value}`
            }
          }
        );
        this.updatePostStatus(id, response.data.post.status);
        console.log(`Post ${id} status updated to ${status}`);
      } catch (error) {
        console.error('Failed to update post status:', error.response?.data || error);
      }
    }
  },
});