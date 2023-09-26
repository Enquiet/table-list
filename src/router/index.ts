import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainPage.vue')
    },
    {
      path: '/card',
      name: 'newCard',
      component: () => import('@/views/NewCardPage.vue')
    },
    {
      path: '/card/:id',
      name: 'userCard',
      component: () => import('@/views/CardPage.vue')
    }
  ]
})

export default router
