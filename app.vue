<script setup lang="ts">
const { $bootstrap }  = useNuxtApp();
const { data } = await useAsyncData('count', () => $fetch('/api/count'));
import { SpeedInsights } from '@vercel/speed-insights/vue';

onMounted(() => {
  try {
    const collapse = new $bootstrap.Collapse('#navbarSupportedContent');
    collapse.show();
  } catch (e) {
    console.log('Bootstrap error: ', e);
  }
});
</script>

<template>
  <SpeedInsights />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
