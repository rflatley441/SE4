import { createRouter, createWebHistory } from 'vue-router'

import SignupPage from '../views/SignupView.vue'
import PasswordPage from '../views/PasswordView.vue'
import GamePlayView from '@/views/GamePlayView.vue'
import LoginView from '@/views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LoginView
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '/password',
      component: PasswordPage
    },
    {
      path: "/game",
      component: GamePlayView,
    }
  ]
})

export default router