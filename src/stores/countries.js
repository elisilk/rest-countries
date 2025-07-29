import { defineStore } from 'pinia'
import { strInObjVals } from '@/utils/index.js'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [],
    country: null,
    borderCountries: [],
    regions: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
    loading: false,
    error: null,
    nameFilter: null,
    regionFilter: null,
  }),
  getters: {
    filteredCountries(state) {
      let filteredData = this.countries

      if (state.nameFilter)
        filteredData = filteredData.filter((country) =>
          strInObjVals(country.name, state.nameFilter),
        )

      if (state.regionFilter)
        filteredData = filteredData.filter((country) => country.region === state.regionFilter)

      return filteredData
    },
    getCountryById: (state) => {
      return (countryId) => state.countries.find((country) => country.cca3 === countryId)
    },
    getBorderCountries: (state) => {
      return (countryCodes) =>
        state.countries.filter((country) => countryCodes.includes(country.cca3))
    },
  },
  actions: {
    async fetchCountries() {
      this.countries = []
      this.loading = true
      try {
        this.countries = await fetch(
          'https://restcountries.com/v3.1/all?fields=cca3,name,population,region,capital,flags',
        ).then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchCountry(countryCode) {
      this.country = null
      this.loading = true
      try {
        const fetchResponse = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`,
        ).then((response) => response.json())
        this.country = fetchResponse && fetchResponse.length > 0 ? fetchResponse[0] : fetchResponse
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchBorderCountries(countryCodes) {
      this.borderCountries = []
      this.loading = true
      try {
        const endpoint =
          'https://restcountries.com/v3.1/alpha?fields=name,cca3&codes=' + countryCodes.join(',')
        this.borderCountries = await fetch(endpoint).then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },
})

// ideas about how to connect an array of bordering countries specified by their cca3 country codes to their country names
// async fetchBorderCountries(countryCodes) {
//   `https://restcountries.com/v3.1/alpha?codes={code},{code},{code}`;
// }
