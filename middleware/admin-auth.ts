import { useCookie } from '#app';
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';

export default defineNuxtRouteMiddleware(async (to) => {
  const adminAuthStore = useAdminAuthStore();
  const cookieToken = useCookie('jwt');

  if (!adminAuthStore.isLogin) {
    try {
      if (!cookieToken.value) {
        adminAuthStore.setLoginStatus(false);
        return navigateTo('/');
      }
      await adminAuthStore.getAdminProfile();
    } catch (error) {
      adminAuthStore.setLoginStatus(false);
      return navigateTo('/');
    }
  }
  
  if (to.path === '/admin/login') {
    return navigateTo('/admin/dashboard');
  }
});
