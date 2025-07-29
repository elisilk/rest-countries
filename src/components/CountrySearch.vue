<script setup>
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()
</script>

<template>
  <div class="country-search__container">
    <label for="country-search">
      <svg
        class="country-search__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1111 10H10.4L10.1333 9.73334C11.0222 8.75556 11.5556 7.42223 11.5556 6.00001C11.5556 2.80001 8.97778 0.222229 5.77778 0.222229C2.57778 0.222229 0 2.80001 0 6.00001C0 9.20001 2.57778 11.7778 5.77778 11.7778C7.2 11.7778 8.53333 11.2445 9.51111 10.3556L9.77778 10.6222V11.3333L14.2222 15.7778L15.5556 14.4445L11.1111 10ZM5.77778 10C3.55556 10 1.77778 8.22223 1.77778 6.00001C1.77778 3.77778 3.55556 2.00001 5.77778 2.00001C8 2.00001 9.77778 3.77778 9.77778 6.00001C9.77778 8.22223 8 10 5.77778 10Z"
          fill="currentColor"
        />
      </svg>
      <span class="sr-only">Search for a country…</span>
    </label>
    <input
      class="country-search-input input-box"
      type="search"
      id="country-search"
      name="q"
      placeholder="Search for a country…"
      v-model="countriesStore.nameFilter"
    />
  </div>
</template>

<style scoped>
.country-search__container {
  flex: 0 1 480px;

  position: relative;
}

.country-search__icon {
  position: absolute;
  left: var(--space-400);
  top: 50%;
  transform: translateY(-50%);
}

.country-search-input {
  appearance: none;
  -webkit-appearance: none;
  padding-inline: calc(var(--space-400) + 16px + var(--space-300)) var(--space-400);
}

.country-search-input:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}
</style>
