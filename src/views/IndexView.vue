<script setup>
import AppControls from '@/components/AppControls.vue'
import CountryList from '@/components/CountryList.vue'
</script>

<template>
  <main class="app__main" id="main-content">
    <div class="inner-container">
      <h1 class="sr-only">REST Countries</h1>
      <AppControls />
      <CountryList />
    </div>
  </main>
</template>

<style scoped>
.app__main > .inner-container {
  padding-block: var(--block-size-app-padding-start) var(--block-size-app-padding-end);
}
</style>
