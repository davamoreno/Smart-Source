<script setup>
import { useMemberAuthStore } from '~/stores/Auth/Member/member';
const { $bootstrap } = useNuxtApp();
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';

const router = useRouter();
const memberAuthStore = useMemberAuthStore();


</script>

<template>

</template>