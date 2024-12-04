<script setup>
import { watchEffect } from 'vue';
import { useRoute, useHead } from '#imports';

const route = useRoute()

watchEffect(() => {
  const title = route.path === '/' ? 'Home' : route.path
  useHead({
    title: title
  })
})
</script>

<template>
    <LayoutWrapper>
        <slot />
    </LayoutWrapper>
</template>