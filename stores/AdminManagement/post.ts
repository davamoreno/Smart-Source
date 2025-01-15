import { useCookie } from '#app';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUrlStore } from '../BaseUrl/Url';

export const postAdminStore = defineStore('postAdmin', {
  state: () => ({
    posts: [],
    reports : [],
    totalItems : [],
    urlStore: useUrlStore();
  }),
  actions: {
    async getPendingPost(page = 1) {
      try {
        const response = await axios.get(`${this.urlStore.url}post/pending?page=${page}`, {
          headers: {
            "Authorization": `Bearer ${useCookie('jwt').value}`
          }
        });
        this.posts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
    async getPendingReport(page = 1) {
      try {
        const response = await axios.get(`${this.urlStore.url}post/report/pending?page=${page}`, {
          headers: {
            "Authorization": `Bearer ${useCookie('jwt').value}`
          }
        });
        this.reports = response.data.post.data;
        this.totalItems = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },updateReportStatus(id : number, report_status : any) {
      const report = this.reports.find(p => p.id === id);
      if (report) {
        report.report_status = report_status;
      }
    },
    async reportValidation(id : number, report_status : any) {
      try {
        const response = await axios.post(`${this.urlStore.url}post/report/handle/${id}`,
          { report_status },
          { params : {
              _method : 'put'
            },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${useCookie('jwt').value}`
            }
          }
        );
        this.updateReportStatus(id, response.data.post.report_status);
        console.log(`Post ${id} status updated to ${report_status}`);
      } catch (error) {
        console.error('Failed to update post status:', error.response?.data || error);
      }
    },updatePostStatus(id : number, status : any) {
      const post = this.posts.find(p => p.id === id);
      if (post) {
        post.status = status;
      }
    },
    async postValidation(id : number, status : any) {
      try {
        const response = await axios.post(
          `${this.urlStore.url}post/validation/${id}`,
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
  }
});