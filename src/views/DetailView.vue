<script setup>
import BackButton from '@/components/BackButton.vue'
import CountryDetail from '@/components/CountryDetail.vue'

import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/stores/countries'

const route = useRoute()

const countriesStore = useCountriesStore()
const { country, loading, error } = storeToRefs(countriesStore)
const { fetchCountry } = useCountriesStore()

// fetchCountry(route.params.countryCode)
// watch the params of the route to fetch the data again
watch(() => route.params.countryCode, fetchCountry, { immediate: true })
</script>

<template>
  <main class="app__main">
    <div class="inner-container inner-container--detail">
      <BackButton />

      <div v-if="loading" class="loading">Loading...</div>

      <div v-if="error" class="error">{{ error.message }}</div>

      <CountryDetail v-if="country" :countryData="country" />
    </div>
  </main>
</template>

<style scoped>
.app__main > .inner-container {
  padding-block: var(--block-size-app-padding-start) var(--block-size-app-padding-end);
}

.inner-container--detail {
  --inline-size-max: var(--inline-size-detail-max);
  --inline-size-gutter: var(--inline-size-detail-gutter);
}
</style>
