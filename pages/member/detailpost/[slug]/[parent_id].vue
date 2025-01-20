<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useCommentStore } from '~/stores/MemberContent/comment';

const route = useRoute();
const slug = route.params.slug;
const parentId = route.params.parent_id;
const comment = useCommentStore();

onMounted(async () => {
    await comment.get(slug);
});

const commentHandle = async () => {

  try {
    await comment.replyComment(slug, parentId);
    comment.content = '';
  } catch (error) {
    console.error('Error posting reply:', error);
  }
};
</script>

<template>
    <div>
      <div v-if="parentId">
        <h3>Parent Comment</h3>
        <p>{{ parentId }}</p>
        <small>By: {{ comment.comments?.user?.username }}</small>
      </div>
  
      <div class="reply-input">
        <input
          v-model="comment.content"
          placeholder="Write your reply..."
          rows="3"
          style="width: 100%; margin-top: 10px;">
        <button @click="commentHandle" style="margin-top: 10px;">Reply</button>
      </div>
  
      <h4>Comments</h4>
    <ul>
      <li v-for="(commentItem, index) in comment.comments" :key="index">
        <ul v-if="commentItem.replies && commentItem.replies.length > 0">
          <li v-for="(replyItem, idx) in commentItem.replies" :key="idx">
            <p>{{ replyItem.content }}</p>
          </li>
        </ul>
        <p v-else>No replies yet.</p>
      </li>
    </ul>
    </div>
  </template>  