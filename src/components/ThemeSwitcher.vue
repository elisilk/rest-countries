<script setup>
import { onMounted } from 'vue'

function setColorTheme(theme) {
  const rootElement = document.documentElement

  // Clear all custom classes and attributes
  rootElement.removeAttribute('data-theme')

  if (theme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark')
  } else if (theme === 'light') {
    rootElement.setAttribute('data-theme', 'light')
  }

  // Store the selected theme in localStorage
  localStorage.setItem('countriesColorTheme', theme)
}

function loadColorTheme() {
  // 1. check for theme saved in local storage
  const savedTheme = localStorage.getItem('countriesColorTheme')
  if (savedTheme) {
    // console.log('Theme saved from local storage:', savedTheme)
    setColorTheme(savedTheme) // Apply the saved theme
    return
  }

  // 2. check for preferred system theme
  const prefersDarkColorScheme =
    window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDarkColorScheme) {
    // console.log('Theme preferred from system:', 'dark')
    setColorTheme('dark') // Apply the saved theme
    return
  }

  // 3. make explicit the default theme: light
  // console.log('Setting default theme:', 'light')
  setColorTheme('light') // Apply the saved theme
}

function handleThemeSwitch(event) {
  setColorTheme(event.currentTarget.dataset.setTheme)
}

onMounted(() => {
  loadColorTheme()
})
</script>

<template>
  <div id="theme-switcher">
    <button
      class="theme-switcher-button text-preset6-semi-bold"
      data-set-theme="light"
      type="button"
      @click="handleThemeSwitch"
    >
      <img src="/icon-theme-light.svg" alt="" />
      <span>Light Mode</span>
    </button>
    <button
      class="theme-switcher-button text-preset6-semi-bold"
      data-set-theme="dark"
      type="button"
      @click="handleThemeSwitch"
    >
      <img src="/icon-theme-dark.svg" alt="" />
      <span>Dark Mode</span>
    </button>
  </div>
</template>

<style scoped>
.theme-switcher-button {
  /* TODO: transitions (t) text-preset6 -> (d) text-preset4 */
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text-primary);
  padding: 0;
  margin: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: var(--space-100);
}

.theme-switcher-button:hover,
.theme-switcher-button:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

[data-theme='light'] button[data-set-theme='light'] {
  display: none;
}

[data-theme='dark'] button[data-set-theme='dark'] {
  display: none;
}
</style>
