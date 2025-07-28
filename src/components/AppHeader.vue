<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <header class="app__header">
    <div class="inner-container">
      <div class="app__title text-preset2">
        <RouterLink to="/">Where in the world?</RouterLink>
      </div>
      <ThemeSwitcher />
    </div>
  </header>
</template>

<style scoped>
.app__header {
  z-index: 1;
  position: sticky;
  top: 0;
  block-size: var(--block-size-header);
  background-color: var(--color-background-secondary);
  box-shadow: var(--shadow-header);

  display: grid;
  align-items: center;
}

.app__header > .inner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app__title a {
  color: inherit;
  text-decoration: none;
}

.app__title a:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}
</style>
