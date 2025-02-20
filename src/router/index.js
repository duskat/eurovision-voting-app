import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Vote from '../views/Vote.vue';
import Leaderboard from '../views/Leaderboard.vue';
import { auth } from '../firebase/config';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote,
    meta: {
      requiresAuth: true,
      authMessage: 'To cast a vote, please log in.',
    },
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
    meta: {
      requiresAuth: true,
      authMessage: 'To see vote results, you need to log in.',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    props: (route) => ({
      redirect: route.query.redirect,
      message: route.query.message,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  // Wait for Firebase to initialize
  const waitForAuthInit = () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  };

  // Check if route requires auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const firebaseUser = await waitForAuthInit();
    const guestUser = localStorage.getItem('guestUser');

    if (!firebaseUser && !guestUser) {
      // Store the intended destination and message
      localStorage.setItem('intendedRoute', to.fullPath);
      // Redirect to login with message
      next({
        path: '/login',
        query: { redirect: to.fullPath },
        state: { message: to.meta.authMessage },
      });
    } else {
      // User is authenticated, proceed
      next();
    }
  } else {
    // Route doesn't require auth
    next();
  }
});

export default router;
