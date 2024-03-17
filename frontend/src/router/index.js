import { createRouter, createWebHistory } from 'vue-router'

// change the top line eventually
import LoginPage from '../views/FAQView.vue'
import SignupPage from '../views/SignupView.vue'
import PasswordPage from '../views/PasswordView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LoginPage
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