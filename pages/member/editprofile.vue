<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { usefacultyStore } from '~/stores/AdminManagement/faculty';
import { useUniversityStore } from '~/stores/AdminManagement/university';
import { useProfileStore } from '~/stores/Auth/Member/memberprofile';

const imageSrc = ref(null);
const member = useMemberAuthStore();
const facultyStore = usefacultyStore();
const universityStore = useUniversityStore();
const profileStore = useProfileStore();

const usernameError = ref(false);

onMounted(async () => {
  await universityStore.getUniversity();
  await facultyStore.getFaculty();
  await member.userProfile;

  member.username = member.userProfile?.username || '';
});

const filteredFaculties = ref([]);
watch(
  () => member.selectedUniversity,
  (newUniversityId) => {
    if (newUniversityId) {
      filteredFaculties.value = facultyStore.faculty.filter(
        (f) => f.university_id === newUniversityId
      );
    } else {
      filteredFaculties.value = [];
    }
  }
);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageSrc.value = URL.createObjectURL(file); 
  }
  profileStore.user_profile = file;
};

const uploadProfileImage = async () => {
  try {
    const response = await profileStore.createImageProfile();
    console.log('Upload berhasil:', response);
    if (response.data && response.data.file_path) {
      member.userProfile.user_profile.file_path = response.data.file_path;
      imageSrc.value = 'http://localhost:8000/storage/' + response.data.file_path;
    }

    const updateResponse = await member.register(updatedData);
    console.log('Profile updated successfully:', updateResponse);

  } catch (err) {
    console.error('Upload gagal:', err);
  }
};

const saveProfileData = () => {
    member.register();
    console.log('Data profil disimpan');
};

const handleImageSave = async () => {
  await uploadProfileImage();  
  saveProfileData();
};

const handleSave = async () => {
  if (member.username.trim() === '') {
    usernameError.value = true;
  } else {
    usernameError.value = false;
    try {
      await member.updateProfile();
      console.log('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  }
};
function hideErrorMessage() {
  usernameError.value = false;
}
</script>

<template>
  <div style="height: 540px;">
    <div class="container border border-black border-opacity-25 rounded-5">
      <div class="row justify-content-around">
        <div class="col-3 border border-black border-opacity-75 rounded-4">
          <div class="row  mt-2 justify-content-center">
            <img
              class="mt-3"
              :src="
                imageSrc ||
                (member.userProfile?.user_profile?.file_path
                  ? 'https://smartsource.nio.my.id/storage/' + member.userProfile?.user_profile?.file_path
                  : '/images/defaultprofile.svg')"
              alt="Profile Image"
              style=" width: 120px; height: auto; border-radius: 50%;  
                object-fit: cover; 
                box-sizing: border-box;"
            />
          </div>
          <div class="row text-center mt-2">
            <h6 class="mt-2">{{ member.userProfile.username }}</h6>
          </div>
          <div class="row text-center">
            <small>{{ member.userProfile?.faculty?.university?.name || '-' }}</small>
            <small>{{ member.userProfile?.faculty?.name || '-' }}</small>
          </div>
          <div class="row px-5 mx-3 mb-2 mt-4 d-flex justify-content-between align-items-center">
              <!-- Tombol Choose File -->
              <div class="custom-file-upload text-center">
                <label for="fileInput" class="btn btn-dark">
                  Choose File
                </label>
                <input
                  id="fileInput"
                  type="file"
                  @change="handleFileUpload"
                  style="display: none"
                />
              </div>
          </div>
          <div class="row px-5 mb-3">
              <button type="submit" @click="handleImageSave" class="btn btn-dark">
                Save Image
              </button>
          </div>
        </div>
        <div class="col-5 border border-black border-opacity-75 rounded-4">
          <form class="px-5 py-4" @submit.prevent="">
            <div class="form-group row">
              <label for="username" class="col-sm-3 col-form-label">Username</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  @input="hideErrorMessage"
                  id="username"
                  name="username"
                  v-model="member.username"
                />
                <span v-if="usernameError" class="text-danger">Username tidak boleh kosong!</span>
              </div>
            </div>
            <div class="form-group row pt-5">
              <label for="selectUniversity" class="col-sm-3 col-form-label">University</label>
              <div class="col-sm-9">
                <select
                  id="selectUniversity"
                  class="form-select"
                  v-model="member.selectedUniversity"
                >
                  <option value="" disabled>Select University</option>
                  <option
                    v-for="uni in universityStore.universities"
                    :key="uni.id"
                    :value="uni.id"
                  >
                    {{ uni.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row pt-5">
              <label for="facultyName" class="col-sm-3 col-form-label">Faculty</label>
              <div class="col-sm-9">
                <select
                  id="facultyName"
                  class="form-select"
                  v-model="member.selectedFaculty"
                  :disabled="!filteredFaculties.length"
                >
                  <option value="" disabled>Select Faculty</option>
                  <option
                    v-for="fac in filteredFaculties"
                    :key="fac.id"
                    :value="fac.id"
                  >
                    {{ fac.name }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row justify-content-evenly ">
        <div class="col-5"></div>
        <div class="col-5 text-end pe-4 pt-4">
          <NuxtLink to="/member/home" type="close" class="btn me-3 btn-outline-dark text-decoration-none">Cancel</NuxtLink>
          <button type="submit" @click="handleSave" class="btn btn-dark me-3">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  
  height: 480px;
  background-color: white;
  margin-top: 60px;
  margin-bottom: 85px;
  padding-top: 75px;
}
</style>