import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginView.vue'
import SignupPage from '../views/SignupView.vue'
import PasswordPage from '../views/PasswordView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: FAQPage
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
        path: '/password',
        component: PasswordPage
      }
  ]
})

export default router