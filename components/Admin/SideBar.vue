<script setup>
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const adminStore = useAdminAuthStore();

function logoutHandler() {
    adminStore.logout().then(() => {
        router.push('/admin/login');
    });
}

onMounted(() => {
  const cookieToken = useCookie('jwt');
  if (cookieToken.value) {
    adminStore.isLogin = true;
    adminStore.getAdminProfile();
  } else {
    console.log('Token tidak ditemukan, user belum login');
  }
});

</script>

<template>
    <aside class="col-md-3" style="background-color: #152259; width: 250px; height: auto;" >
        <div class="col pt-4" style="justify-content: center; text-align: center; border-bottom: 1px solid white;">
            <img src="/assets/images/AdminProfile.jpg" alt="" style="width: 98px; height: 100px; border-radius: 50%;">
            <h6 class="pt-2" style="color: white; font-weight: bold; font-family: Kumbh Sans; font-size: 18px;">
                {{ adminStore.adminProfile.role }}
            </h6>
            <p class="text-white fw-light" style="font-family: unset; font-size: 14px">
                {{ adminStore.adminProfile.username }}
            </p>
        </div>
        <nav class="nav flex-column">
            <div class="container px-5 py-3">
                <div class="menu-item pb-4">
                    <img src="/assets/images/admin1.svg" alt="" class="menu-icon" style="padding-right: 3px; vertical-align: 0%;">
                    <a href="/admin/dashboard" class="text-white text-decoration-none fw-bold">Dashboard</a>
                </div>
                <div class="menu-item pb-4">
                    <img src="/assets/images/home.svg" alt="" class="menu-icon" style="padding-right: 3px; vertical-align: 0%;">
                    <a href="/admin/managepost" class="text-white text-decoration-none fw-bold">Manage Posts</a>
                </div>
                <div class="menu-item pb-3">
                    <i class="fa-regular fa-flag me-2 text-white"></i>
                    <a href="/admin/managereport" class="text-white text-decoration-none fw-bold">Manage Reports</a>
                </div>
                <div class="menu-item">
                    <div class="accordion" id="accordionSidebar">
                        <div class="accordion-item" style="background-color: #152259; border: none;">
                            <h2 class="accordion-header">
                                <button class="accordion-button text-white bg-transparent border-0 shadow-none collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#dataPostMenu"
                                        aria-expanded="false" aria-controls="dataPostMenu" style="padding: 0;">
                                    <i class="fas fa-chart-bar me-2"></i>
                                    <p style="margin-top: 13px; margin-right: 20px;">Data Post</p>
                                </button>
                            </h2>
                            <div id="dataPostMenu" class="accordion-collapse collapse" data-bs-parent="#accordionSidebar">
                                <div class="accordion-body py-0">
                                    <a href="#" class="text-white text-decoration-none d-block py-2">Published</a>
                                    <a href="#" class="text-white text-decoration-none d-block py-2">Denied</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu-item pb-2">
                    <div class="accordion" id="accordionSidebar2">
                        <div class="accordion-item" style="background-color: #152259; border: none;">
                            <h2 class="accordion-header">
                                <button class="accordion-button text-white bg-transparent border-0 shadow-none collapsed fw-bold" data-bs-toggle="collapse" data-bs-target="#dataReportMenu"
                                        aria-expanded="false" aria-controls="dataPostMenu" style="padding: 0;">
                                    <i class="fa-solid fa-circle-exclamation me-2"></i>
                                    <p style="margin-top: 13px; margin-right: 15px;">Data Report</p>
                                </button>
                            </h2>
                            <div id="dataReportMenu" class="accordion-collapse collapse" data-bs-parent="#accordionSidebar2">
                                <div class="accordion-body py-0">
                                    <a href="#" class="text-white text-decoration-none d-block py-2">Accepted</a>
                                    <a href="#" class="text-white text-decoration-none d-block py-2">Rejected</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="adminStore.adminProfile.role === 'super_admin'" class="menu-item pb-4">
                    <i class="fa-regular fa-circle-user text-white"></i>
                    <a href="/admin/manageadmin" class="text-white text-decoration-none ms-1 fw-bold">Manage Admin</a>
                </div>

                <div class="menu-item pb-4">
                    <img src="/images/logout.svg" alt="Logout Icon" class="menu-icon" />
                    <button @click="logoutHandler" class="btn text-decoration-none ms-1 text-danger fw-bold">Log Out</button>
                </div>
            </div>
        </nav>
    </aside>
</template>


<style scoped lang="scss">
    .accordion-button::after{
        width: 10px !important;
        height: 10px !important;
        background-size: 10px;
        background-image: url('/assets/images/Chevron.svg');
    }
</style>