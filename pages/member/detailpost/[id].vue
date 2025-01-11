<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '~/stores/MemberContent/post';
import axios from 'axios';

const post = usePostStore();
const route = useRoute();

onMounted(async () => {
    const postId = route.params.id;
    await post.showPostDetail(postId);
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
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
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle">
                    <img src="/public/images/heart.svg" alt="" style="height: 50px; width: 50px;" class="position-absolute top-50 start-50 translate-middle">
                </button>
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle">
                    <img src="/public/images/Download.svg" alt="" style="height: 35px; width: 40px;" class="position-absolute top-50 start-50 translate-middle">
                </button>
                <button style="height: 50px; width: 50px;" class="position-relative btn btn-light btn-outline-dark me-4 rounded-circle">
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
            <embed :src="`http://127.0.0.1:8000/storage/${post.postDetail?.file.file_path}#toolbar=0`" type="application/pdf" style="width: 1200px; height: 800px;">
        </div>

        <!-- Kolom Comment -->
        <div class="row mt-5" style="padding-left: 90px; padding-right: 90px;">
            <p class="fs-4 pb-4">Comments</p>
            <img src="/public/images/commentprofile.svg" alt="" style="height: 70px; width: 70px; padding-bottom: 20px;">
            <input type="text" class="form-control border border-dark" id="university" name="university" placeholder="Comment.." style="height: 48px; width: 1115px; background-color: transparent;">
        </div>

        <div class="row justify-content-end" style="padding-left: 90px; padding-right: 90px;">
            <button class="btn btn-dark" style="width: 105px; height: 36px; margin-right: 19px;">Submit</button>
        </div>
    
        <div class="row mt-5" style="padding-left: 88px; padding-right: 88px;">
            <img src="/public/images/commentprofile.svg" alt="" style="height: 70px; width: 70px; padding-bottom: 20px;">
            <div class="col">
                <span class="d-flex">
                    <h6 class="me-3">Mutia Azzahra</h6>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                    <small class="fw-lighter">29 November 2024</small>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                </span>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo obcaecati maxime voluptates veritatis blanditiis laborum magni nam nisi. Amet placeat quo natus minus blanditiis totam enim itaque iste non voluptate ut tempore ea consequatur, eveniet deleniti porro possimus repellat maiores ab! Incidunt, hic nobis facere sunt tempora at adipisci debitis!
                </p>
            </div>
        </div>
        <div class="row" style="padding-left: 140px; padding-right: 140px;">
            <span>
                <button class="btn btn-link" style="width: 55px; height: 55px;">
                    <img src="/public/images/comment_light.svg" alt="" style="width: 40px; height: 40px;">
                </button>    
                <small class="fw-medium">20 Comments</small>
                <button class="btn btn-link ms-3" style="width: 48px; height: 48px;">
                        <img src="/public/images/Thumbs up.svg" alt="" style="width: 30px; height: 30px; padding-bottom: 3px;">
                </button>
                <small class="fw-medium">Like</small>
                <button class="btn btn-link ms-3" style="width: 50px; height: 50px;">
                        <img src="/public/images/Reply.svg" alt="" style="width: 40px; height: 40px; padding-bottom: 3px;">
                </button>
                <small class="fw-medium">Reply</small>
            </span>
        </div>
        <!--  -->

        <!-- Kolom Child Comment -->
        <div class="row mt-5" style="padding-left: 155px; padding-right: 90px;">
            <img src="/public/images/commentprofile.svg" alt="" style="height: 70px; width: 70px; padding-bottom: 20px;">
            <input type="text" class="form-control border border-dark" id="university" name="university" placeholder="Comment.." style="height: 48px; width: 1050px; background-color: transparent;">
        </div>

        <div class="row justify-content-end" style="padding-left: 90px; padding-right: 90px;">
            <button class="btn btn-dark" style="width: 105px; height: 36px; margin-right: 19px;">Submit</button>
        </div>
        <!--  -->

        <!-- Child Comment -->
        <div class="row mt-5" style="padding-left: 205px; padding-right: 88px;">
            <img src="/public/images/commentprofile.svg" alt="" style="height: 70px; width: 70px; padding-bottom: 20px;">
            <div class="col">
                <span class="d-flex">
                    <h6 class="me-3">Yonathan Martin</h6>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                    <small class="fw-lighter">29 November 2024</small>
                    <img src="/public/images/dot.svg" alt="" class="pb-1">
                </span>
                <p>Hai, aku yonathan</p>
            </div>
        </div>
        <div class="row" style="padding-left: 255px; padding-right: 140px;">
            <span>
                <button class="btn btn-link ms-1" style="width: 48px; height: 48px;">
                        <img src="/public/images/Thumbs up.svg" alt="" style="width: 30px; height: 30px; padding-bottom: 3px;">
                </button>
                <small class="fw-medium">Like</small>
            </span>
        </div>
        <!--  -->

    </div>

</template>