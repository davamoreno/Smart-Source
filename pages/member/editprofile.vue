<script setup>
import { computed } from 'vue';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { useProfileStore } from '~/stores/Auth/Member/memberprofile';
import { ref, onMounted } from 'vue';
const imageSrc = ref(null);

const member = useMemberAuthStore();
const user = computed( () => member.userProfile);

onMounted(() => {
    member.userProfile;
})
const profileStore = useProfileStore();

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  profileStore.user_profile = file;
};

const uploadProfileImage = async () => {
  try {
    const response = await profileStore.createImageProfile();
    console.log('Upload berhasil:', response);
  } catch (err) {
    console.error('Upload gagal:', err);
  }
};


</script>

<template>
<div style="height: 520px;">
<div class="container border border-black border-opacity-25 rounded-5">
    <div class="row justify-content-around">

        <div class="col-3 border border-black border-opacity-75 rounded-4">
            <div class="row justify-content-center">
                <img class="mt-3" :src="member.userProfile?.user_profile?.file_path ? 'http://localhost:8000/storage/' + member.userProfile?.user_profile?.file_path : '/public/images/defaultprofile.svg' " alt="Profile Image"  style="width: 130px; height: 100px; border-radius: 60%;" />
            </div>
            <div class="row text-center">
                <h6>{{ user.username }}</h6>
            </div>
            <div class="row text-center">
                <small>Politeknik Ngeri Bali</small>
                <small>Teknik Silat</small>
            </div>
            <div class="row px-5 mt-4 justify-content-center">
                <input type="file" @change="handleFileUpload" />
                
            </div>
        </div>

        <div class="col-5 border border-black border-opacity-75 rounded-4">
            <div class="row">
                
                <!-- <div class="col-3 px-5 py-4">
                    <div class="mb-3 pt-2">
                    <label for="username" class="form-label">Username</label>
                    </div>
                    <div class="mb-3 pt-4">
                    <label for="university" class="form-label">University</label>
                    </div>
                    <div class="mb-3 pt-4 mt-1">
                    <label for="faculty" class="form-label">Faculty</label>
                    </div>
                </div>
                <div class="col-9 px-5 py-4">
                    <form>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="username">
                        </div>
                        <div class="mb-3 pt-4">
                            <input type="text" class="form-control" id="university">
                        </div>
                        <div class="mb-3 pt-4">
                            <select id="faculty" class="form-select">
                                <option>Disabled select</option>
                            </select>
                        </div>
                        
                    </form>
                </div> -->
            
                <form class="px-5 py-4"> 
                    <div class="form-group row"> 
                        <label for="username" class="col-sm-3 col-form-label">Username</label> 
                        <div class="col-sm-9"> 
                            <input type="text" class="form-control" id="username" name="username" :value="user.username"> 
                        </div> 
                    </div> 
                    <div class="form-group row pt-5"> 
                        <label for="university" class="col-sm-3 col-form-label">University</label> 
                        <div class="col-sm-9 position-relative">
                            <div class="input-group">
                                <input type="text" class="form-control" id="university" name="university" :value="user.university" placeholder="Enter university name">
                                <span class="input-group-text position-absolute end-0 border-0 pt-2" style="background: transparent;">
                                <img src="/public/images/searchlogo.svg" alt="search icon" style="width: 20px; height: 20px;">
                                </span>
                            </div>
                        </div>
                    </div> 
                    <div class="form-group row pt-5"> 
                        <label for="faculty" class="col-sm-3 col-form-label">Faculty</label> 
                        <div class="col-sm-9 "> 
                            <select class="form-select" id="faculty" name="faculty"> 
                                <option>Disabled select</option> 
                            </select> 
                        </div> 
                    </div> 
                </form>

            </div>
        </div>
    </div>

<div class="row justify-content-evenly">

    <div class="col-5">
    </div>

    <div class="col-5 text-end pe-4 pt-4">
            <button type="submit" class="btn me-3 btn-outline-dark">Cancel</button> 
            <button type="submit" @click="uploadProfileImage" class="btn btn-dark me-3">Save Changes</button>
    </div>
</div>
  
  
</div>
</div>

</template>

<style lang="scss" scoped>


.container {

height: 420px;
background-color: white;
margin-top: 60px;
margin-bottom: 85px;
padding-top: 75px;

}


</style>