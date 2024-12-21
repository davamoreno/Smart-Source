<script setup>
import { computed,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

const member = useMemberAuthStore();
const router = useRouter();

const user = computed( () => member.userProfile);

function logoutHandler() {
    member.logout().then(() => {
        return navigateTo('/');
    });
}


</script>

<template>
    <aside class="col-md-3 sidebar pt-5">
        <div class="text-center">
          <img src="https://via.placeholder.com/80" alt="Profile" class="profile-img mb-3" />
          <h4>{{ user.username }}</h4>
          <p>Politeknik Negeri Bali</p>
          <p>Teknologi Informasi</p>
          <button class="btn btn-primary btn-sm">Edit Profile</button>
        </div>
        <hr />
        <nav class="nav flex-column">
          <div class="container px-5">
          <div class="menu-item ms-4">
            <img src="/images/newpost.svg" alt="New Post Icon" class="menu-icon" />
            <a class="nav-link text-dark" href="#">New Post</a>
          </div>
          <div class="menu-item ms-4">
            <img src="/images/history.svg" alt="History Icon" class="menu-icon" />
            <a class="nav-link text-dark" href="#">History</a>
          </div>
          <div class="menu-item ms-4">
            <img src="/images/bookmark.svg" alt="Bookmark Icon" class="menu-icon" />
            <a class="nav-link text-dark" href="#">Bookmarks</a>
          </div>
          <div class="menu-item ms-4">
            <img src="/images/mypost.svg" alt="My Post Icon" class="menu-icon" />
            <a class="nav-link text-dark" href="#">My Post</a>
          </div>
          <div class="menu-item logout ms-4">
            <img src="/images/logout.svg" alt="Logout Icon" class="menu-icon" />
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">Log Out</a>
          </div>
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