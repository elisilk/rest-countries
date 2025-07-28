<script setup></script>

<template>
  <!-- <RouterLink to="/" class="back-button input-box text-preset5-light"> -->
  <button type="button" @click="$router.go(-1)" class="back-button input-box text-preset5-light">
    <svg width="22" height="14" viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.56991 0.370847L8.95692 1.69667L4.37977 6.07189L21.8562 6.07189L21.8562 7.92805L4.37977 7.92805L8.95692 12.3033L7.56991 13.6291L0.634821 6.99997L7.56991 0.370847Z"
        fill="currentColor"
      />
    </svg>
    <span>Back</span>
  </button>
</template>

<style scoped>
.back-button {
  display: inline flex;
  gap: var(--space-100);
  align-items: center;
  justify-content: center;
  inline-size: 104px;
  block-size: 32px;
  margin-block-end: var(--space-800); /* (m) 64px -> (t) 56px -> (d) 80px */
}

.back-button {
  text-decoration: none;
  color: inherit;
}

.back-button:hover,
.back-button:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .back-button {
    margin-block-end: var(--space-700); /* (m) 64px -> (t) 56px -> (d) 80px */
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  .back-button {
    margin-block-end: var(--space-1000); /* (m) 64px -> (t) 56px -> (d) 80px */
  }
}
</style>
