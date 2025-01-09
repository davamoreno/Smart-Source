import { useCookie } from "#app";
import { useMemberAuthStore } from "~/stores/Auth/Member/member";
import { useAdminAuthStore } from "~/stores/Auth/Admin/admin";
import axios from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const memberAuthStore = useMemberAuthStore();
  const adminAuthStore = useAdminAuthStore();
  const token = useCookie('jwt').value;
  const url = 'http://localhost:8000/api/';

  if (!token) {
    return navigateTo('/login');
  }

  try {
    // Validasi Admin
    await axios.get(`${url}admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    adminAuthStore.setLoginStatus(true); // Admin berhasil login
    memberAuthStore.setLoginStatus(false); // Pastikan member logout
  } catch (adminError) {
    try {
      // Validasi Member
      await axios.get(`${url}user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      memberAuthStore.setLoginStatus(true); // Member berhasil login
      adminAuthStore.setLoginStatus(false); // Pastikan admin logout
    } catch (memberError) {
      // Jika validasi admin dan member gagal, reset status dan redirect ke login
      adminAuthStore.setLoginStatus(false);
      memberAuthStore.setLoginStatus(false);
      return navigateTo('/login');
    }
  }


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
