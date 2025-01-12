<script setup>
import { ref, onMounted, computed} from 'vue';
import { usePostStore } from '~/stores/MemberContent/post';

const postStore = usePostStore();

onMounted(async () => {
    await postStore.myPost();
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
<div class="container-fluid">
    <div class="row">
        <SideBar/>
        <div class="col px-5 py-5"> 
            <h4 class="">Uploads</h4>

            <div class="row py-5" 
                v-for="posts in postStore.userPost"
                :key="posts.id"
                v-if="postStore.userPost.length"
            >
                <div class="col-2">
                    <img src="/public/images/dokumen.svg" alt="">
                </div>
                <div class="col-8 text-start">
                    <ul class="list-unstyled">
                        <li><p>{{ posts.title }}</p></li>  
                        <li class="pb-5"><small>{{ posts.description }}</small></li>
                        <li>
                            <span>
                                <small>Date : {{ formatDate(posts.created_at) }}</small>
                                <small class="ps-5" v-if="posts.status === 'allow'">Status : Published</small>
                                <small class="ps-5" v-else-if="posts.status === 'deny'">Status : Denied</small>
                                <small class="ps-5"  v-else-if="posts.status === 'pending'">Status : Pending</small>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="col-2 py-5">
                    <button class="btn btn-outline-danger btn-sm px-5 py-2"  data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                </div>

                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <span class="d-flex">
                                    <img src="/public/images/trash.svg" alt="">
                                    <p style="color: #FF5E5E;" class="ps-2 pt-3 fs-4 fw-medium">Delete</p>
                                </span>
                                <div class="d-flex justify-content-center">
                                    <H4 class="mt-4 mb-5 fw-light">Confirm to delete ?</H4>
                                </div>
                                <div class="row py-3">
                                    <div class="col">
                                        <button type="button" class="btn btn-danger btn-outline-dark text-light w-100 rounded-3" data-bs-dismiss="modal">No</button>
                                    </div>
                                    <div class="col">
                                        <button type="button" class="btn btn-primary btn-outline-dark text-light w-100 rounded-3">Yes</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    


</div>

</template>