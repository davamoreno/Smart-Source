<script setup>
import { computed,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

const member = useMemberAuthStore();
const router = useRouter();

onMounted(async () => {
  if (!member.userProfile) {
    await member.getUserProfile();
  }
});

function logoutHandler() {
    member.logout().then(() => {
        return navigateTo('/');
    });
}

</script>

<template>  
    <aside class="col-md-3 sidebar pt-5">
      <div class="text-center"> 
          <img :src="member.userProfile?.user_profile?.file_path ? 'https://smartsource.nio.my.id/storage/' + member.userProfile?.user_profile?.file_path : '/images/defaultprofile.svg'" alt="" class="profile-img mb-3">
          <h4>{{ member.userProfile.username }}</h4>
          <p>{{ member.userProfile?.faculty?.university?.name ? 
                member.userProfile.faculty.university.name : '-' }}</p>
          <p>{{ member.userProfile?.faculty?.name ?
                member.userProfile.faculty.name : '-' }}</p>
          <NuxtLink to="/member/editprofile" class="btn btn-primary btn-sm px-4">Edit Profile</NuxtLink>
        </div>
        <hr />
        <nav class="nav flex-column px-5 pt-3">
          <div class="menu-item ms-4 pt-3">
            <img src="/images/newpost.svg" alt="New Post Icon" class="menu-icon" />
            <NuxtLink to="/member/uploadpost" class="nav-link text-dark" aria-current="page">New Post</NuxtLink>
          </div>
          <div class="menu-item ms-4 pt-3">
            <img src="/images/history.svg" alt="History Icon" class="menu-icon" />
            <NuxtLink to="/member/history" class="nav-link text-dark" aria-current="page">History</NuxtLink>
          </div>
          <div class="menu-item ms-4 pt-3">
            <img src="/images/bookmark.svg" alt="Bookmark Icon" class="menu-icon" />
            <NuxtLink to="/member/BookmarkCard" class="nav-link text-dark" aria-current="page">Bookmark</NuxtLink>
          </div>
          <div class="menu-item ms-4 pt-3">
            <img src="/images/mypost.svg" alt="My Post Icon" class="menu-icon" />
            <NuxtLink to="/member/mypost" class="nav-link text-dark" aria-current="page">My Post</NuxtLink>
          </div>
          <div class="menu-item logout ms-4 pt-3">
            <img src="/images/logout.svg" alt="Logout Icon" class="menu-icon" />
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">Log Out</a>
          </div>
        </nav>
      </aside>
      <div class="modal" id="logoutModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
                <h4 class="me-auto">Log Out <i class="fa fa-lock"></i></h4>
                <a class="close btn" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </a>
            </div>
            <div class="modal-body">
              <p>
                  <i class="fa fa-question-circle"></i> Are you sure you want to log-off? <br />
              </p>
              <div class="">
                  <form action="" method="post">
                      <input type="hidden" name="logout" value=""/>
                        <button
                          type="button"
                          class="btn btn-default btn-primary"
                          @click="logoutHandler"
                          data-bs-dismiss="modal">
                          Logout
                        </button>
        	            <button class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                  </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
</template>

<style scoped lang="scss">
.sidebar {
  background-color: #ffffff;
  width: 20%;
  min-height: 100vh;
  padding: inherit;
  border-right: 2px solid #e5e5e5;
  border-left: 2px solid #e5e5e5;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

body {
  background-color: #ffe6eb;
}

.pink-header {
  color: #000;
}

.menu-item.logout {
  .nav-link {
    color: red;
  }
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 5px; /* Jarak antara ikon dan teks */
  margin-bottom: 10px; /* Jarak antar menu */

  .menu-icon {
    margin-right: 5px;
    width: 24px; /* Ukuran ikon */
    height: auto;
  }

  .nav-link {
    font-weight: bold;
    text-decoration: none;
    font-size: 16px;
    color: #333;
    transition: color 0.3s ease;

  }
}

.menu-item .nav-link {
  padding-left: 0;
}

.view-more {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
}

.sidebar {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.sidebar h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.sidebar p {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.profile-img {
  border-radius: 50%;
}


.modal-header{
    border-bottom: 2px solid black;
    h4{
        height: 15px;
    }
    a{
        font-size: 20px;
    }
}

</style>