import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/role/:id',
      name: 'role-detail',
      component: () => import('@/views/RoleDetailView.vue'),
    },
    {
      path: '/plays',
      name: 'play-list',
      component: () => import('@/views/PlayListView.vue'),
    },
    {
      path: '/play/:id',
      name: 'play-detail',
      component: () => import('@/views/PlayDetailView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
    },
  ],
})

export default router
