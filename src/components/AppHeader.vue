<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <header class="app__header">
    <div class="inner-container">
      <a class="skip-to-main" href="#main-content">Skip to main content</a>
      <RouterLink to="/" class="app__title text-preset2">Where in the world?</RouterLink>
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
  position: relative;
}

.skip-to-main {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% -400%;
  color: var(--color-text-primary);
  background-color: var(--color-background-primary);
  text-decoration: none;
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
  transition: translate 0.3s;
}

.skip-to-main:hover,
.skip-to-main:focus-visible {
  translate: -50% -50%;
}

.app__title {
  display: block;
  color: inherit;
  text-decoration: none;
}

.app__title:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}
</style>
