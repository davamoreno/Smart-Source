import { useCookie } from '#app';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

export default defineNuxtRouteMiddleware(async (to) => {
  const memberAuthStore = useMemberAuthStore();

  if (!useCookie('jwt').value) {
    memberAuthStore.setLoginStatus(false);
    return navigateTo('/');
  }

  if (!memberAuthStore.isLogin) {
    try {
      await memberAuthStore.getUserProfile();
    } catch (error) {
      memberAuthStore.setLoginStatus(false);
      return navigateTo('/');
    }
  }
});
