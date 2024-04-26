import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from "firebase/auth";


import LoginPage from '../views/LoginView.vue'
import SignupPage from '../views/SignupView.vue'
import PasswordPage from '../views/PasswordView.vue'
import GamePlayView from '@/views/GamePlayView.vue'
import HomeView from '@/views/Homeview.vue'
import FAQView from '@/views/FAQView.vue'

const requireAuth = (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    // User not logged in, redirect to login page
    next({ name: 'Login' });
  } else {
    // User is logged in, proceed to requested route
    next();
  }
};

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
    },
    {
      path: "/game",
      component: GamePlayView,
    },
    {
      path: "/home",
      component: HomeView,
      beforeEnter: requireAuth, 
    },
    {
      path: "/faq",
      component: FAQView,
    },
  ]
})

export default router