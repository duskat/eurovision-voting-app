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
    meta: { requiresAuth: true },
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
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
      // User is not authenticated
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      // User is authenticated
      next();
    }
  } else if (to.path === '/login') {
    // Check if user is already authenticated
    const firebaseUser = await waitForAuthInit();
    const guestUser = localStorage.getItem('guestUser');

    if (firebaseUser || guestUser) {
      // If user is authenticated and tries to access login page,
      // redirect to vote page or the requested redirect
      next(to.query.redirect || '/vote');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
