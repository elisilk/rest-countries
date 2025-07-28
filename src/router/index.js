import { createWebHistory, createRouter } from 'vue-router'

import Index from '@/views/IndexView.vue'

const routes = [
  { path: '/', name: 'Home', component: Index },
  { path: '/:countryCode', name: 'Detail', component: () => import('@/views/DetailView.vue') },
  // { path: '/detail/:id', name: 'Detail', component: () => import('@/views/DetailView.vue') },
]

const router = createRouter({
  history: createWebHistory('/rest-countries/'),
  routes,
})

export default router
