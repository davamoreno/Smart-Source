import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';
import { useUrlStore } from '../BaseUrl/Url';

export const usePostStore = defineStore('postStore', {
  state: () => {
    return {
      title: '',
      description: '',
      selectedCategory: '',
      file: <any>[],
      selectedPaper: '',
      posts: <any>[],
      loading: false,
      error: null,
      urlStore: useUrlStore(),
      page: 1,
      pageCount: 1,
      postDetail: null,
      isLiked: false,
      reason: '',
      report: '',
      userPost: [],
      status: '',
      keyword: ''
    };
  },
  
  
  actions: {
    clearError() {
      setTimeout(() => {
        this.error = null;
      }, 5000);
    },

    async createPost() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('category_id', this.selectedCategory);
        formData.append('file', this.file);
        formData.append('paper_type_id', this.selectedPaper);

        const response = await axios.post(`${this.urlStore.url}create/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
            "Authorization": `Bearer ${useCookie('jwt').value}`,
          }
        });

        console.log('post:', response.data);
        this.posts.push(response.data.post);
        this.clearError();
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred while creating post';
      } finally {
        this.loading = false;
      }
    },

    async getPost() {
      try {
        const response = await axios.get(`${this.urlStore.url}user/post`, {
          params : {
            page: this.page,
            keyword: this.keyword,
          },
          headers : {
            Authorization : `Bearer ${useCookie('jwt').value}`
          } 
        });

        const newPosts = response.data.data;

        if (this.page > 1) {
          const newPostIds = new Set(this.posts.map(post => post.id));
          const filteredPosts = newPosts.filter(post => !newPostIds.has(post.id));
          this.posts = [...this.posts, ...filteredPosts];
        } else {
          this.posts = newPosts;
        }
        console.log('post', newPosts);
        this.page = response.data.current_page;
        this.pageCount = response.data.last_page;

      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred while showing post';
      }
    },

    async showPostDetail(slug : any) {
      try {
        const response = await axios.get(`${this.urlStore.url}user/post/${slug}`,{
          headers : {
            Authorization : `Bearer ${useCookie('jwt').value}`
          }
        });
        this.postDetail = response.data;
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    },
    async createLike(slug : any) {
      try {

        const response = await axios.post(`${this.urlStore.url}post/like/${slug}`, {}, {
          headers : {
            Authorization : `Bearer ${useCookie('jwt').value}`
          }
        }
      );
      const post = this.postDetail;
      post.like = true;
      post.likes_count = this.postDetail.likes_count + 1;

      } catch (error) {
        this.postDetail.like = false;
        this.postDetail.likes_count = this.postDetail.likes_count - 1;
        console.error('Error Message:', error.message);
      }
    },

    async deleteLike(slug : any) {
      try {
        const response = await axios.post(`${this.urlStore.url}post/like/${slug}`, {}, {
          params : {
            '_method' : 'delete'
          },
          headers : {
            Authorization : `Bearer ${useCookie('jwt').value}`
          }
        });

        this.postDetail.like = false;
        this.postDetail.likes_count = this.postDetail.likes_count - 1;
      } catch (error) {
        const post = this.postDetail?.find(post => post.slug === slug);
        if (post) {
          post.like = true;
          post.likes_count += 1;
        }
        console.error('Error Message:', error.message);
      } finally {
        this.isLiked = false;
      }
    },

    async createReport(id : any) {
      try {
        const formData = new FormData();
        formData.append('reason', this.reason);
        
        const response = await axios.post(`${this.urlStore.url}post/report/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
            "Authorization": `Bearer ${useCookie('jwt').value}`,
          }
        });
        this.report = response.data;
      } catch (error) {
        console.error('Error creating report:', error);
      }
    },

    async myPost() {
      try {
        const response = await axios.get(`${this.urlStore.url}user/mypost`, {
          headers: {
            "Authorization": `Bearer ${useCookie('jwt').value}`
          }
        });
        
        if (response.data.posts) {
          this.userPost = response.data.posts;
        } else {
          console.log('No posts found');
        }
      } catch (error) {
        console.error('Error fetching my posts:', error);
      }
    },

    async deletePost(slug : any){
      try{  
          const response = await axios.delete(`${this.urlStore.url}user/post/delete/${slug}`,
          {
              headers : {
                  "Authorization": `Bearer ${useCookie('jwt').value}`
              },
          }
        )
        this.posts = this.posts.filter(post => post.slug != slug);
        console.log('delete', response.data);
      }catch(err){
        return console.log('err', err);
      }
    },

    resetForm() {
      this.title = '';
      this.description = '';
      this.selectedCategory = '';
      this.selectedPaper = '';
      this.file = [];
    }
  }
});
