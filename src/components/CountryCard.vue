<script setup>
defineProps({
  countryData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="country-card">
    <img class="country__flag" :src="countryData.flags.svg" alt="country flag" />
    <div class="country__info">
      <h2 class="country__name">
        <RouterLink
          :to="{ name: 'Detail', params: { countryCode: countryData.cca3 } }"
          class="country__detail-link text-preset3"
          >{{ countryData.name.common }}</RouterLink
        >
      </h2>
      <dl class="country__data">
        <div>
          <dt class="country__label">Population</dt>
          <dd class="country__population">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'decimal',
              }).format(countryData.population)
            }}
          </dd>
        </div>
        <div>
          <dt class="country__label">Region</dt>
          <dd class="country__region">{{ countryData.region }}</dd>
        </div>
        <div>
          <dt class="country__label">Capital</dt>
          <dd class="country__capital">
            <span v-for="capital in countryData.capital" :key="capital">{{ capital }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.country-card {
  box-shadow: var(--shadow-card);
  background-color: var(--color-background-secondary);
  position: relative;
}

.country__flag {
  inline-size: 264px;
  block-size: 160px;
  object-fit: cover;
  object-position: center;
}

.country__name {
  margin-block-end: var(--space-200);
}

.country__detail-link {
  color: var(--color-text-primary);
  text-decoration: none;
  outline: none;
}

.country__detail-link:after {
  content: '';
  position: absolute;
  inset: 0;
}

.country__info {
  padding: 22px var(--space-300) var(--space-600);
}

.country__data {
  display: grid;
  gap: var(--space-100);
  margin: 0;
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

.country__capital span:not(:last-child):after {
  content: ', ';
}

/* hover/focus states */

.country-card:hover {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

.country-card a:focus {
  text-decoration: underline;
}

.country-card:focus-within {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

.country-card:focus-within a:focus {
  text-decoration: none;
}
</style>
