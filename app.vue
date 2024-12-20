<script setup lang="ts">
const { $bootstrap }  = useNuxtApp();
const { data } = await useAsyncData('count', () => $fetch('/api/count'));

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
