<script setup>
const { $bootstrap } = useNuxtApp();

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
