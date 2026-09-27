import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: () => import("@/views/MainView.vue") },
  { path: "/policies/legal", component: () => import("@/views/legal/LegalView.vue") },
  { path: "/policies/rgpd", component: () => import("@/views/legal/LegalRgpdView.vue") },
  { path: "/:pathMatch(.*)*", component: () => import("@/views/error/NotFound.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 65,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router