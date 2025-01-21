import { useCookie } from '#app';
import { useAdminAuthStore } from '~/stores/Auth/Admin/admin';

export default defineNuxtRouteMiddleware(async (to) => {
  const adminAuthStore = useAdminAuthStore();
  const cookieToken = useCookie('jwt');

if (to.path === '/admin/login') {
    return navigateTo('/admin/dashboard');
  }
});