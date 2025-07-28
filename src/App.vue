<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <!-- <RouterView :key="$route.path" /> -->
</template>

<style scoped></style>
