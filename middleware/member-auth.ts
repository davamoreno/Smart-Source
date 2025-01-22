import { useCookie } from '#app';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const memberAuthStore = useMemberAuthStore();
  const jwtToken = useCookie('jwt').value;

  if (!jwtToken) {
    memberAuthStore.setLoginStatus(false);
    return navigateTo('/');
  }

  if (memberAuthStore.isLogin) {
    try {
      console.log('Query Params in Middleware:', to.query);
      await memberAuthStore.getUserProfile();
    } catch (error) {
      memberAuthStore.setLoginStatus(false);
      return navigateTo('/');
    }
  }
  console.log('Query Params in Middleware:', to.query);
});
