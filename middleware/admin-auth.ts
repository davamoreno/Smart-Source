import { useCookie } from '#app';
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';

export default defineNuxtRouteMiddleware(async (to) => {
  const adminAuthStore = useAdminAuthStore();
  const token = useCookie('jwt').value;

  // Jika token tidak ada, redirect hanya jika rute memerlukan autentikasi
  if (!token) {
    adminAuthStore.setLoginStatus(false);

    if (to.meta.requiresAuth) {
      return navigateTo('/admin/login');
    }
    return;
  }

  // Jika belum login, ambil profil admin
  if (!adminAuthStore.isLogin) {
    try {
      await adminAuthStore.getAdminProfile();
      adminAuthStore.setLoginStatus(true);
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
      adminAuthStore.setLoginStatus(false);
      return navigateTo('/admin/login');
    }
  }

  // Jika login, tetapi rute hanya untuk tamu, redirect ke dashboard
  if (to.meta.requiresGuest && adminAuthStore.isLogin) {
    return navigateTo('/admin/dashboard');
  }

  // Jika memerlukan autentikasi dan admin tidak login, redirect ke login
  if (to.meta.requiresAuth && !adminAuthStore.isLogin) {
    return navigateTo('/admin/login');
  }
});
