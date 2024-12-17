import { useCookie } from '#app';
import { defineNuxtPlugin } from '#app';
import { useMemberAuthStore } from '~/stores/Auth/Member/member';

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = nuxtApp.$pinia; // Pastikan Pinia sudah diinstal
    const token = useCookie('jwt');
  
    if (pinia) {
      const { useMemberAuthStore } = require('~/stores/Auth/Member/member');
      const memberAuthStore = useMemberAuthStore(pinia);
  
      if (token.value) {
        memberAuthStore.setLoginStatus(true);
      }
    }
});
