<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '~/stores/MemberContent/post';
import axios from 'axios';
import { useCommentStore } from '~/stores/MemberContent/comment';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

const post = usePostStore();
const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const comment = useCommentStore();
const member = useMemberAuthStore();
const slug = route.params.slug;
const showSuccessModal = ref(false);
const commentErrorMessage = ref(false);
const reportErrorMessage = ref(false);

function validateForm() {
  if (comment.content.trim() === '') {
    commentErrorMessage.value = true;
  } else {
    commentErrorMessage.value = false;
    comment.content = '';  
  }
}

function validateReportForm() {
  if (post.reason.trim() === '') {
    reportErrorMessage.value = true;
    
  } else {
    reportErrorMessage.value = false;
    post.reason = ''; 
    showModal.value = false;
    showSuccessModal.value = true;
  }
}

function hideCommentErrorMessage() {
  commentErrorMessage.value = false;
}

function hideReportErrorMessage() {
  reportErrorMessage.value = false;
}

function closeModal() {
  showModal.value = false;
  post.reason = '';
  reportErrorMessage.value = false; 
}

function goToParentComment(slug, parentId) {
  router.push(`/member/detailpost/${slug}/${parentId}`);
}

onMounted(async () => {
    member.getUserProfile();
});


onMounted(async () => {
    if (!slug) {
        console.error('Slug is missing!');
        router.push('/member/home');
        return;
    }

    await post.showPostDetail(slug);
});

onMounted(async () => {
    if (!slug) {
        console.error('Slug is missing!');
        router.push('/member/home');
        return;
    }

    await comment.get(slug);
});

onActivated(async () => {
    post.showPostDetail()
    post.like;
    post.likes_count;
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
}

const createdLike = (postId) => {
    post.createLike(postId);
};

const deletedLike = (postId) => {
    post.deleteLike(postId);
};

const reportHandle = async (postId) => {
    await post.createReport(postId);
}

const commentHandle = async(postId) => {
    await comment.create(postId);
    await comment.get(postId);
    comment.content = ref('')
}

</script>

<template>
    <div class="container-fluid py-3 my-5 overflow-x-hidden" style="padding-left: 80px; padding-right: 80px;">
        <h4 class="fw-bolder">
            {{ post.postDetail?.title || 'Loading...' }}
        </h4>
        <div class="row mt-4">
            <span>
                <button style="height: 36px; width: 120px;" class="btn btn-light btn-outline-dark me-4 rounded-2 fw-semibold">{{ post.postDetail?.paper_type.name }}</button>
                <button style="height: 36px; width: 120px;" class="btn btn-light btn-outline-dark rounded-2 fw-semibold">{{ post.postDetail?.category.name }}</button>
            </span>
        </div>
        <div class="row mt-4">
            <p>Published by <a href="">{{ post.postDetail?.user.username }}</a> on {{ formatDate(post.postDetail?.created_at) }}</p>
            <p>{{ post.postDetail?.description }}</p>
            <h6>{{ post.postDetail?.likes_count }} Likes</h6>
        </div>
        <div class="row mt-4">
            <span>
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle" @click="createdLike(post.postDetail?.slug)" v-if="post.postDetail?.like === false">
                    <img src='/public/images/heart.svg' alt="" style="height: 50px; width: 50px;" class="position-absolute top-50 start-50 translate-middle">
                </button>
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle" @click="deletedLike(post.postDetail?.slug)" v-if="post.postDetail?.like === true">
                    <img src='/public/images/heart-fill.svg' alt="" style="height: 50px; width: 26px;" class="position-absolute top-50 start-50 translate-middle">
                </button>   
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle">
                    <img src="/public/images/Download.svg" alt="" style="height: 35px; width: 40px;" class="position-absolute top-50 start-50 translate-middle">
                </button>
                <button  style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle" @click="showModal = true">
                     <img src="/public/images/report.svg" alt="" style="height: 25px; width: 30px;" class="position-absolute top-50 start-50 translate-middle">
               </button>
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle">
                    <img src="/public/images/bookmark.svg" alt="" style="height: 35px; width: 40px;" class="position-absolute top-50 start-50 translate-middle">
                </button>
                <button style="height: 50px; width: 240px;" class="position-relative btn btn-dark me-4 rounded-5">
                    <span>
                        <img src="/public/images/newpostlight.svg" alt="" style="height: 50px; width: 50px;" class="position-absolute top-50 start-0 translate-middle-y ps-4">
                        <p style="padding-top: 7px; padding-left: 30px;" class="fw-medium lw-lg fw-light">Add a comment</p>
                    </span>
                </button>
            </span>
        </div>

        <div class="row mt-5 justify-content-center">
            <embed :src="`https://smartsource.nio.my.id/storage/${post.postDetail?.file?.file_path}#toolbar=0`" type="application/pdf" style="width: 1200px; height: 800px;">
        </div>

        <div class="row mt-5" style="padding-left: 90px; padding-right: 90px;">
            <p class="fs-4 pb-4">Comments</p>
            <img :src="member.userProfile?.user_profile?.file_path ? 'https://smartsource.nio.my.id/storage/' + member.userProfile?.user_profile?.file_path : '/public/images/defaultprofile.svg'" alt="" style="height: 70px; width: 70px; padding-bottom: 20px;   ">
            <input type="text" class="form-control border border-dark" id="university" name="university" placeholder="Comment.." style="height: 48px; width: 1115px; background-color: transparent;"
            v-model="comment.content"
            @keyup.enter="commentHandle(post.postDetail?.slug)">
        </div>

        <div class="row justify-content-end" style="padding-left: 90px; padding-right: 90px;">
            <button class="btn btn-dark" style="width: 105px; height: 36px; margin-right: 19px;"
                    @click="commentHandle(post.postDetail?.slug)"
                    @keyup.enter="commentHandle(post.postDetail?.slug)">
                    Submit
            </button>
        </div>
    
        <div class="row mt-5" style="padding-left: 88px; padding-right: 88px;" v-for="commentars in comment.comments" :key="commentars.parent_id">
            <img 
              :src="commentars.user?.user_profile?.file_path 
                ? 'https://smartsource.nio.my.id/storage/' + commentars.user?.user_profile?.file_path 
                : '/public/images/defaultprofile.svg'"
              alt="User Profile"
              style="height: 70px; width: 70px; padding-bottom: 20px;"
            >
            <div class="col">
                <span class="d-flex">
                    <h6 class="me-3"></h6>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                    <small class="fw-lighter">{{ formatDate(commentars.created_at) }}</small>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                </span>
                <p>{{ commentars.content }}</p>
            </div>
        <div class="row" style="">
            <span>
                <button class="btn btn-link form-control border border-dark" 
                        style="width: 55px; height: 55px;"
                        @click="goToParentComment(post.postDetail?.slug, commentars.id)"
                        @input="hideCommentErrorMessage"
                        type="text" 
                        :placeholder="commentErrorMessage ? 'Kolom komentar tidak boleh kosong!' : 'Comment..'" 
                        :class="{ 'error-placeholder': commentErrorMessage }"
                    >
                    <img src="/public/images/comment_light.svg" alt="" style="width: 40px; height: 40px;">
                </button>  
                <small class="fw-medium">20 Comments</small>
                <button class="btn btn-link ms-3" style="width: 48px; height: 48px;">
                        <img src="/public/images/Thumbs up.svg" alt="" style="width: 30px; height: 30px; padding-bottom: 3px;">
                </button>
                <small class="fw-medium">Like</small>
                
                <small class="fw-medium">Reply</small>
            </span>
        </div>
        </div>
    </div>
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header border-0">     
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>  
              </div>
              <h5 class="modal-title text-center w-100 mb-2">Report Post</h5>
              <div class="modal-body text-center mb-4 ">
                <p class="mb-4">Please make sure you are only reporting posts that violate our community guidelines.</p>
                <form @submit.prevent="reportHandle(post.postDetail?.id)">
                    <textarea class="form-control mb-4 " rows="5"
                        v-model="post.reason"
                        @input="hideReportErrorMessage"
                        :placeholder="reportErrorMessage ? 'Alasan laporan tidak boleh kosong!' : 'Enter your report'" 
                        :class="{ 'error-placeholder': reportErrorMessage }">
                    </textarea>
                    <button class="btn btn-dark rounded-3 w-100 py-2" type="submit" @click="validateReportForm">Submit Report</button>
                </form>
              </div>
            </div>
        </div>
    </div>
    <div v-if="showSuccessModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body text-center py-5">
              <div class="mb-4">
                <img src="/public/images/Icon.svg" alt="Success Icon"  style="width: 100px; height: auto;">
              </div>
              <h3 class="mb-3">Report Received</h3>
              <p class="mb-4">We have received your report and will review it as soon as possible.</p>
              <button type="button" class="btn btn-dark rounded-3 w-50 py-2" @click="showSuccessModal = false">Close</button>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
.modal-header {
  justify-content: space-between;
}
.modal-body p {
  color: #6c757d;
  font-size: 0.9rem;
}
.btn-dark {
  background-color: black;
  border: none;
}
.btn-dark:hover {
    border: 1px solid black;
  background-color:white;
  color: black
}

input.error-placeholder::placeholder {
  color: red; 
}
textarea.error-placeholder::placeholder {
  color: red;
}
.btn-light:hover img {
  filter: brightness(0) invert(1); 
  transition: filter 0.3s ease;
}
.btn-dark:hover img {
  filter: brightness(0);
  transition: filter 0.3s ease;
}
</style>
