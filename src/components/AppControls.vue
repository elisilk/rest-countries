<script setup>
import CountrySearch from '@/components/CountrySearch.vue'
import RegionFilter from '@/components/RegionFilter.vue'
</script>

<template>
  <div class="app-controls">
    <h2 class="sr-only">App controls</h2>
    <CountrySearch />
    <RegionFilter />
  </div>
</template>

<style scoped>
.app-controls {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--space-100);
  row-gap: var(--space-500);
  align-items: start;
  justify-content: space-between;

  margin-block-end: var(--block-size-controls-margin-end);
}
</style>
