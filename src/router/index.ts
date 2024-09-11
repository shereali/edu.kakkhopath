// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Course from '@/views/CourseView.vue'
import CourseDetails from '@/views/CourseDetails.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Offer from '@/views/Offer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { auth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { auth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { auth: true }
  },
  {
    path: '/offers',
    name: 'Offer',
    component: Offer,
    meta: { auth: true }
  },
  {
    path: '/courses',
    name: 'Course',
    component: Course,
    meta: { auth: true }
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    component: CourseDetails,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.isLoggedIn) {
    next({ name: 'Login' })
  } else if (!to.meta.auth && authStore.isLoggedIn && to.name === 'Login') {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
