<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug;
const parentId = route.params.parent_id;

</script>

<template>
    <div>
      <h1>Detail Post</h1>
      <p>Slug: {{ slug }}</p>
      <p>Parent ID: {{ parentId }}</p>
    </div>
</template>