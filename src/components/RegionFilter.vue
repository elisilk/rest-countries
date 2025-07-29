<script setup>
import { useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()
const { regions } = storeToRefs(countriesStore)

const selectContainer = useTemplateRef('select-container')
const selectButton = useTemplateRef('select-button')
const dropdown = useTemplateRef('select-dropdown')
const placeholder = useTemplateRef('select-placeholder')
const selectedValue = useTemplateRef('select-value')

let focusedIndex = -1

const toggleDropdown = (expand = null) => {
  const isOpen = expand !== null ? expand : dropdown.value.classList.contains('hidden')
  const wasOpen = !dropdown.value.classList.contains('hidden')
  dropdown.value.classList.toggle('hidden', !isOpen)
  selectButton.value.setAttribute('aria-expanded', isOpen)

  if (isOpen) {
    focusedIndex = [...Array.from(dropdown.value.children)].findIndex(
      (option) => option.ariaSelected === 'true',
    )
    focusedIndex = focusedIndex === -1 ? 0 : focusedIndex
    updateFocus()
    placeholder.value.classList.remove('hidden')
    selectedValue.value.classList.add('hidden')
  } else {
    focusedIndex = -1
    if (wasOpen) selectButton.value.focus()
    if (selectedValue.value.innerHTML === '') {
      placeholder.value.classList.remove('hidden')
      selectedValue.value.classList.add('hidden')
    } else {
      placeholder.value.classList.add('hidden')
      selectedValue.value.classList.remove('hidden')
    }
  }
}

const updateFocus = () => {
  Array.from(dropdown.value.children).forEach((option, index) => {
    if (option) {
      option.setAttribute('tabindex', index === focusedIndex ? '0' : '-1')
      if (index === focusedIndex) option.focus()
    }
  })
}

const handleOptionSelect = (option) => {
  Array.from(dropdown.value.children).forEach((opt) => opt.setAttribute('aria-selected', false))
  option.setAttribute('aria-selected', true)
  selectedValue.value.textContent = option.textContent.trim() // Update selected value
  selectedValue.value.classList.remove('hidden')
  placeholder.value.classList.add('hidden')
  countriesStore.regionFilter = selectedValue.value.textContent

  if (option.dataset.value === 'clear') {
    // Reset to the default value
    selectedValue.value.textContent = ''
    Array.from(dropdown.value.children).forEach((opt) => opt.setAttribute('aria-selected', false))
    selectedValue.value.classList.add('hidden')
    placeholder.value.classList.remove('hidden')
    countriesStore.regionFilter = ''
    return
  }
}

const handleOptionClick = (event) => {
  handleOptionSelect(event.target)
  toggleDropdown(false)
}

const handleSelectButtonKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    toggleDropdown(true)
  } else if (event.key === 'Escape') {
    toggleDropdown(false)
  }
}

const handleSelectDropdownKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusedIndex = (focusedIndex + 1) % Array.from(dropdown.value.children).length
    updateFocus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusedIndex =
      (focusedIndex - 1 + Array.from(dropdown.value.children).length) %
      Array.from(dropdown.value.children).length
    updateFocus()
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleOptionSelect(Array.from(dropdown.value.children)[focusedIndex])
    toggleDropdown(false)
  } else if (event.key === 'Escape') {
    toggleDropdown(false)
  }
}

const handleClickInside = () => {
  toggleDropdown()
}

const handleClickOutside = (event) => {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    toggleDropdown(false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Custom Dropdown Structure -->
  <div
    v-if="regions"
    class="region-filter__container custom-select text-preset6-regular"
    ref="select-container"
  >
    <button
      id="dropdown-button"
      class="select-button input-box"
      type="button"
      role="combobox"
      aria-label="select button"
      aria-haspopup="true"
      aria-expanded="false"
      aria-controls="select-dropdown"
      ref="select-button"
      @click="handleClickInside"
      @keydown="handleSelectButtonKeyDown"
    >
      <span class="select-placeholder" ref="select-placeholder">Filter by Region</span>
      <span class="select-value" ref="select-value"></span>
      <span class="arrow">
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.875 0.8125L4 3.6875L1.125 0.8125L0.25 1.6875L4 5.4375L7.75 1.6875L6.875 0.8125Z"
          />
        </svg>
      </span>
    </button>
    <ul
      class="select-dropdown input-box hidden"
      role="listbox"
      id="select-dropdown"
      aria-labelledby="dropdown-button"
      ref="select-dropdown"
      @keydown="handleSelectDropdownKeyDown"
    >
      <li
        v-for="region in regions"
        :key="region"
        role="option"
        aria-selected="false"
        ref="select-options"
        @click="handleOptionClick"
      >
        {{ region }}
      </li>
      <!-- Clear option to reset selection -->
      <li
        role="option"
        data-value="clear"
        aria-selected="false"
        ref="select-option-clear"
        @click="handleOptionClick"
      >
        Clear selection
      </li>
    </ul>
  </div>
</template>

<style scoped>
.region-filter__container {
  flex: 0 1 200px;
}

.custom-select {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.select-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-inline: var(--space-300);
  cursor: pointer;
}

.select-button:focus-within,
.select-button:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 4px;
}

.select-dropdown {
  z-index: 1;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  list-style: none;
  margin: var(--space-100) 0 0;
  padding: var(--space-150) var(--space-100);
  block-size: calc(144px + 28px); /* 144px */
  overflow-y: auto;
}

.select-dropdown li {
  cursor: pointer;
  padding: var(--space-50) var(--space-200);
}

/* Highlight the selected option */
.select-dropdown li[aria-selected='true'] {
  background-color: var(--color-background-primary);
  font-weight: var(--fw-extra-bold);
}

.select-dropdown li:hover,
.select-dropdown li:focus {
  background-color: var(--color-background-primary);
}

.select-dropdown li:focus-visible {
  outline: 1px dashed var(--color-text-primary);
  outline-offset: 2px;
}

.select-dropdown.hidden,
.select-value.hidden,
.select-placeholder.hidden {
  display: none;
}
</style>
