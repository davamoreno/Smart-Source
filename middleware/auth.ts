import { useCookie } from "#app";
import { useMemberAuthStore } from "~/stores/Auth/Member/member";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('jwt');
  const memberAuthStore = useMemberAuthStore();

  if (token.value) {
    // Set isLogin jika token ada
    memberAuthStore.setLoginStatus(true);
  }

  // Redirect jika user sudah login dan mencoba ke halaman guest
//   if (to.meta.requiresGuest && memberAuthStore.isLogin) {
//     return navigateTo('/home');
//   }

  // Redirect jika halaman butuh auth, tetapi user belum login
  if (to.meta.requiresAuth && !memberAuthStore.isLogin) {
    return navigateTo('/');
  }
});