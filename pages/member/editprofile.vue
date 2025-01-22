<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
import { usefacultyStore } from '~/stores/AdminManagement/faculty';
import { useUniversityStore } from '~/stores/AdminManagement/university';
import { useProfileStore } from '~/stores/Auth/Member/memberprofile';
import { useRouter } from 'vue-router';

const imageSrc = ref(null);
const member = useMemberAuthStore();
const facultyStore = usefacultyStore();
const universityStore = useUniversityStore();
const profileStore = useProfileStore();

const usernameError = ref(false);
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
const router = useRouter();

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
    console.log('Server Response:', response); // Cek response dari server
    if (response.data && response.data.file_path) {
    
      member.userProfile.user_profile.file_path = response.data?.file_path;
      imageSrc.value =
        'https://smartsource.nio.my.id/storage/' + response.data?.file_path;

      // Menampilkan notifikasi jika upload berhasil
      showAlert('Profile image updated successfully!', 'success');
    }
  } catch (err) {
    console.error('Upload failed:', err);
    // Menampilkan notifikasi jika terjadi error
    showAlert('Failed to upload profile image!', 'danger');
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
    showAlert('Username cannot be empty!', 'danger');
  } else {
    usernameError.value = false;
    try {
      // Save the updated profile information
      await member.updateProfile();
      showAlert('Profile updated successfully!', 'success');
    } catch (err) {
      console.error('Failed to update profile:', err);
      showAlert('Failed to update profile!', 'danger');
    }
  }
};

const showAlert = (message, type) => {
  notificationMessage.value = message;
  notificationType.value = type; // 'success' or 'danger'
  showNotification.value = true;
  
  console.log(`Notification Message: ${message}`); // Debug log

  // Menyembunyikan notifikasi setelah 3 detik
  setTimeout(() => {
    showNotification.value = false;
    if (type === 'success') {
      // Redirect setelah 3 detik jika sukses
      setTimeout(() => router.push('/member/home'), 300);
    }
  }, 3000); // Notifikasi muncul selama 3 detik
};

function hideErrorMessage() {
  usernameError.value = false;
}
</script>

<template>
  <div>
    <!-- Notifikasi -->
    <div
      v-if="showNotification"
      :class="`alert alert-${notificationType} position-fixed top-0 start-50 translate-middle-x mt-3`"
      style="z-index: 1050; width: 80%; max-width: 400px; text-align: center;"
    >
      {{ notificationMessage }}
    </div>

    <!-- Konten Utama -->
    <div style="height: 600px;">
      <div class="container border border-black border-opacity-25 rounded-5">
        <div class="row justify-content-around">
          <!-- Bagian Profil -->
          <div class="col-3 border border-black border-opacity-75 rounded-4">
            <div class="row mt-2 justify-content-center">
              <img
                class="mt-3"
                :src="imageSrc ||
                  (member?.userProfile?.user_profile?.file_path 
                    ? 'https://smartsource.nio.my.id/storage/' + member.userProfile?.user_profile?.file_path
                    : '/public/images/defaultprofile.svg')"
                alt="Profile Image"
                style="width: 120px; height: auto; border-radius: 50%; object-fit: cover; box-sizing: border-box;"
              />
            </div>
            <div class="row text-center mt-2">
              <h6 class="mt-2">{{ member.userProfile.username }}</h6>
            </div>
            <div class="row text-center">
              <small>{{ member.userProfile?.faculty?.university?.name || '-' }}</small>
              <small>{{ member.userProfile?.faculty?.name || '-' }}</small>
            </div>
            <div class="row px-5 mt-4 justify-content-center">
              <input type="file" @change="handleFileUpload" />
            </div>
            <div class="row mt-2 justify-content-center">
              <button @click="uploadProfileImage" class="btn btn-dark">
                <h6>Save Image</h6>
              </button>
            </div>
          </div>

          <!-- Bagian Form -->
          <div class="col-5 border border-black border-opacity-75 rounded-4">
            <form class="px-5 py-4" @submit.prevent="handleSave">
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
                  <span v-if="usernameError" class="text-danger">
                    Username cannot be empty!
                  </span>
                </div>
              </div>
              <div class="form-group row pt-5">
                <label for="selectUniversity" class="col-sm-3 col-form-label">University</label>
                <div class="col-sm-9">
                  <select
                    id="selectUniversity"
                    class="form-select"
                    v-model="member.selectedUniversity"
                    :disabled="universityStore.universities.length === 0"
                  >
                    <option value="" disabled>Select University</option>
                    <option
                      v-for="uni in universityStore.universities"
                      :key="uni.id"
                      :value="uni.id"
                    >
                      {{ uni?.name }}
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
        <div class="row justify-content-evenly">
          <div class="col-5"></div>
          <div class="col-5 text-end pe-4 pt-4">
            <NuxtLink
              to="/member/home"
              type="close"
              class="btn me-3 btn-outline-dark text-decoration-none"
            >
              Cancel
            </NuxtLink>
            <button type="submit" @click="handleSave" class="btn btn-dark me-3">
              Save Changes
            </button>
          </div>
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