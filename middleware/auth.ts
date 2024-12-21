import { useCookie } from "#app";
import { useMemberAuthStore } from "~/stores/Auth/Member/member";
import { useAdminAuthStore } from "~/stores/Auth/Admin/admin";
import axios from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('jwt');
  const memberAuthStore = useMemberAuthStore();
  const adminAuthStore = useAdminAuthStore();
  const url = 'http://localhost:8000/api/';

  if (token.value) {
    try {
      let response = await axios.get(`${url}admin/profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      adminAuthStore.setLoginStatus(true);
    } catch (error) {
      try {
        let response = await axios.get(`${url}user/profile`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        memberAuthStore.setLoginStatus(true);
      } catch (error) {
        token.value = null;
        adminAuthStore.setLoginStatus(false);
        memberAuthStore.setLoginStatus(false);
      }
    }
  }

  // Halaman hanya untuk tamu
  if (to.meta.requiresGuest && (memberAuthStore.isLogin || adminAuthStore.isLogin)) {
    if(memberAuthStore.isLogin){
      return navigateTo('/home')
    }
    else if(adminAuthStore.isLogin){
      return navigateTo('/admin/dashboard')
    }
  }

  // Halaman membutuhkan otentikasi
  if (to.meta.requiresAuth && !memberAuthStore.isLogin && !adminAuthStore.isLogin) {
    return navigateTo('/')
  }
});
