import { createRouter, createWebHistory } from 'vue-router'
import About from '../view/About.vue';
import Home from '../view/Home.vue';
import Jobs from '../view/Jobs.vue';
import JobDetails from '../view/JobDetails.vue';



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
      },
      {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
      },
      {
        path: '/jobs/:id',
        name: 'JobDetails',
        component: JobDetails,
        props: true
      },
  ]
})

export default router
