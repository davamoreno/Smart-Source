import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app';
import { useUrlStore } from '../BaseUrl/Url';
import { useMemberAuthStore } from '../Auth/Member/member';

export const useCommentStore = defineStore('commentPost', {
    state: () => {
        return{
            urlStore : useUrlStore(),
            content: ref(''),
            isLoading: ref(false),
            comments: ref(<any>[]),
            userImage: ref({}),
            repliesComment : ref([<any>[]])
        }
    },
    actions: {
        async replyComment(slug: string, parentId: number) {
            try {
              this.isLoading = true;
              const response = await axios.post(
                `${this.urlStore.url}post/comment/${slug}/${parentId}`,
                {
                  content: this.content
                },
                {
                  headers: {
                    Authorization: `Bearer ${useCookie('jwt').value}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              console.log('Reply Comment Success:', response.data);
              this.comments.push(response.data.comments);
            } catch (error) {
              console.error('Error Replying Comment:', error);
            } finally {
              this.isLoading = false;
            }
        },
        async get(slug : any){
            const response = await axios.get(`${this.urlStore.url}post/comment/${slug}`, {
                headers : {
                    Authorization : `Bearer ${useCookie('jwt').value}`
                }
            })
            this.comments = response.data.comments;
            this.repliesComment =  this.comments.map(comment => comment.replies);
            this.userImage = this.comments.map(comment => comment.user);
            console.log('Comments', response.data.comments);
            console.log('user', this.userImage);
        },
        async create(id : number){
            try {
                this.isLoading = true;
                const response = await axios.post(`${this.urlStore.url}post/comment/${id}`, {
                    content : this.content
                },
                {
                    headers : {
                        "Authorization" : `Bearer ${useCookie('jwt').value}`,
                        "Content-Type" : "application/json"
                    }
                }
            )
            this.comments.push(response.data.comments);
            console.log('comment success', response.data)
            } catch (error) {
                
            }
        }
    }
});