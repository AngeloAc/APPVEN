import { createRouter, createWebHistory } from 'vue-router'
import About from '../view/About.vue';
import Home from '../view/Home.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
      {
        path: '/about',
        name: 'About',
        component: About
      }
  ]
})

export default router
