<script setup>
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/stores/countries'

const props = defineProps({
  countryData: {
    type: Object,
    required: true,
  },
})

const countriesStore = useCountriesStore()
const { borderCountries, loading, error } = storeToRefs(countriesStore)
const { fetchBorderCountries } = useCountriesStore()

props.countryData.borders && fetchBorderCountries(props.countryData.borders)
</script>

<template>
  <div class="country-detail">
    <img
      v-if="[countryData.flags && countryData.flags.svg]"
      class="country__flag"
      :src="countryData.flags.svg"
      alt="country flag"
    />

    <div class="country-detail__text">
      <h1 v-if="[countryData.name && countryData.name.common]" class="country__name">
        {{ countryData.name.common }}
      </h1>

      <dl class="country__data">
        <div v-if="[countryData.name && countryData.name.nativeName]">
          <dt class="country__label">Native Name</dt>
          <dd class="country__value country__region">
            {{ countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]].common }}
          </dd>
        </div>
        <div v-if="countryData.population">
          <dt class="country__label">Population</dt>
          <dd class="country__value country__population">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'decimal',
              }).format(countryData.population)
            }}
          </dd>
        </div>
        <div v-if="countryData.region">
          <dt class="country__label">Region</dt>
          <dd class="country__value country__region">{{ countryData.region }}</dd>
        </div>
        <div v-if="countryData.subregion">
          <dt class="country__label">Sub Region</dt>
          <dd class="country__value country__subregion">{{ countryData.subregion }}</dd>
        </div>
        <div v-if="countryData.capital">
          <dt class="country__label">Capital</dt>
          <dd class="country__value country__capital">
            {{ countryData.capital[0] }}
          </dd>
        </div>
      </dl>

      <dl class="country__data">
        <div v-if="countryData.tld">
          <dt class="country__label">Top Level Domain</dt>
          <dd class="country__value country__domain">
            <span v-for="domain in countryData.tld" :key="domain">
              {{ domain }}
            </span>
          </dd>
        </div>
        <div v-if="countryData.currencies">
          <dt class="country__label">Currencies</dt>
          <dd class="country__value country__currencies">
            <span v-for="currency in countryData.currencies" :key="currency.name">
              {{ currency.name }}
            </span>
          </dd>
        </div>
        <div v-if="countryData.languages">
          <dt class="country__label">Languages</dt>
          <dd class="country__value country__languages">
            <span v-for="language in Object.values(countryData.languages)" :key="language">
              {{ language }}
            </span>
          </dd>
        </div>
      </dl>

      <div v-if="countryData.borders" class="country__border-countries">
        <div v-if="loading" class="loading">Loading...</div>

        <div v-if="error" class="error">{{ error.message }}</div>

        <h3>Border Countries:</h3>
        <div v-if="borderCountries">
          <RouterLink
            v-for="borderCountry in borderCountries"
            :key="borderCountry.cca3"
            :to="{ name: 'Detail', params: { countryCode: borderCountry.cca3 } }"
            class="country__link input-box text-preset5-light"
            >{{ borderCountry.name.common }}</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.country__link {
  display: inline flex;
  align-items: center;
  justify-content: center;
  block-size: 28px;
  min-inline-size: 104px;
  inline-size: fit-content;
}

.country__link {
  text-decoration: none;
  color: inherit;
}

.country__link:hover,
.country__link:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

.country-detail {
  display: grid;
  align-items: center;
  justify-content: center;
  row-gap: var(--space-600);
  column-gap: var(--space-600);
}

.country__flag {
  border-radius: var(--br-300);
  align-self: start;
  box-shadow: var(--shadow-flag);
}

.country-detail__text {
  display: grid;
  align-items: start;
  grid-template-areas:
    'name'
    'info1'
    'info2'
    'border';
}

.country__name {
  grid-area: name;
  margin-block-end: var(--space-200); /* (m) 16px -> (t) 24px */
}

.country__data {
  display: grid;
  gap: var(--space-100);
  margin: 0;
}

.country__data:first-of-type {
  grid-area: info1;
}

.country__data:last-of-type {
  grid-area: info2;
  margin-block-start: var(--space-400);
}

.country__border-countries {
  grid-area: border;
  margin-block-start: var(--space-400); /* (m) 32px -> (t) 24px-> (d) 64px */

  display: flex;
  flex-wrap: wrap;
  gap: var(--space-200);
}

.country__data div {
  display: flex;
  gap: 0.5ch;

  font-weight: var(--fw-light);
  font-size: var(--fs-400);
  line-height: 16px;
}

.country__data dt {
  font-weight: var(--fw-semi-bold);
}

.country__data dt::after {
  content: ': ';
}

.country__data dd {
  margin: 0;
}

.country__data dd span:not(:last-child)::after {
  content: ', ';
}

.country__border-countries div {
  display: flex;
  gap: var(--space-200);
  flex-wrap: wrap;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .country__flag {
    border-radius: var(--br-400);
  }

  .country-detail {
    row-gap: var(--space-700);
  }

  .country-detail__text {
    grid-template-areas:
      'name name'
      'info1 info2'
      'border border';
    /* grid-template-columns: 250px 250px; */
    column-gap: var(--space-400);
    /* justify-content: space-between; */
  }

  .country__name {
    margin-block-end: var(--space-300); /* (m) 16px -> (t) 24px */
  }

  .country__data:last-of-type {
    margin-block-start: 0;
  }

  .country__border-countries {
    grid-area: border;
    margin-block-start: var(--space-300); /* (m) 32px -> (t) 24px-> (d) 64px */
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .country-detail {
    grid-template-columns: minmax(280px, 560px) 598px;
  }

  .country__border-countries {
    grid-area: border;
    margin-block-start: var(--space-800); /* (m) 32px -> (t) 24px-> (d) 64px */
  }
}
</style>
