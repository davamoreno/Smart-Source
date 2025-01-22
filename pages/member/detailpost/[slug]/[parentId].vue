<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useCommentStore } from '~/stores/MemberContent/comment';

const route = useRoute();
const slug = route.params.slug;
const parentId = route.params.parentId;
const comment = useCommentStore();

onMounted(async () => {
    await comment.getReply(slug, parentId);
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
  <div class="container mt-5">
    <div v-if="parentId" class="main-comment mb-4 p-4 border border-0 rounded-lg shadow-lg bg-white d-flex align-items-start">
      <div class="profile-image me-3">
        <img 
          :src="'https://smartsource.nio.my.id/storage/' + comment.repliesComment?.user?.user_profile?.file_path || 'default-profile.jpg'"
          alt="Profile Image"
          class="rounded-circle"
          width="60"
          height="60"
        />
      </div>
      <div class="content flex-fill">
        <div class="username mb-2 text-primary">{{ comment.repliesComment?.user?.username }}</div>
        <h4>{{ comment.repliesComment?.content }}</h4>
      </div>
    </div>

    <!-- Reply Input Section -->
    <div class="reply-input mb-5">
      <textarea
        v-model="comment.content"
        placeholder="Write your reply..."
        rows="3"
        class="form-control mb-2"
        style="resize: none;"></textarea>
      <button @click="commentHandle" class="btn btn-dark w-100">Post Reply</button>
    </div>

    <!-- Replies Section -->
    <h4 class="mb-5 text-center">Replies</h4>
    <ul class="list-unstyled">
      <li v-for="commentItem in comment.repliesComment?.replies" :key="commentItem.id" class="reply-item mb-3 d-flex align-items-start">
        <div class="profile-image me-3">
          <img 
            :src="'https://smartsource.nio.my.id/storage/' + commentItem.user?.user_profile?.file_path || 'default-profile.jpg'"
            alt="Profile Image"
            class="rounded-circle"
            width="50"
            height="50"
          />
        </div>
        <div class="content">
          <div class="username mb-2 text-primary">{{ commentItem.user?.username }}</div>
          <p>{{ commentItem.content }}</p>
        </div>
      </li>
    </ul>

    <p v-if="!comment.repliesComment?.replies || comment.repliesComment.replies.length === 0" class="text-center text-muted">
      No replies yet.
    </p>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 100%; /* Ensure it fills the full width */
  padding: 0 15px; /* Adding some padding to avoid content sticking to the edges */
}

.main-comment {
  width: 100%; /* Fill the width of the container */
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 15px;
}

.main-comment:hover {
  transform: translateY(-5px);
}

.profile-image img {
  object-fit: cover;
}

.reply-input button {
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.reply-input button:hover {
  background-color: #343a40;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.reply-item {
  display: flex;
  align-items: start;
  margin-bottom: 15px;
}

.reply-item .profile-image img {
  object-fit: cover;
}

.reply-item .content p {
  font-size: 16px;
}

h4.text-primary {
  font-weight: bold;
}

@media (max-width: 576px) {
  .main-comment {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-comment h4 {
    font-size: 18px;
  }

  .main-comment small {
    font-size: 12px;
  }

  .reply-input textarea {
    font-size: 14px;
  }
}
</style>
