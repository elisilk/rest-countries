<script setup>
import CountryCard from '@/components/CountryCard.vue'

import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()
const { countries, loading, error, filteredCountries } = storeToRefs(countriesStore)
const { fetchCountries } = useCountriesStore()
//const { filteredCountries } = storeToRefs(countriesStore)

fetchCountries()
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>

  <div v-if="error" class="error">{{ error.message }}</div>

  <div v-if="countries">
    <h2 class="sr-only">Country list</h2>
    <div class="country-list">
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.cca3"
        :countryData="country"
      />
    </div>
  </div>

  <div v-else>No data available</div>
</template>

<style scoped>
.country-list {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 264px);
  gap: var(--gap-country-list); /* (m) 40px -> (t) 72px */
}
</style>
