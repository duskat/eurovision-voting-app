<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/vote">Vote</router-link>
      <router-link to="/leaderboard">Leaderboard</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth } from './composables/useAuth';
import { useRouter } from 'vue-router';

const { isLoggedIn, initAuth } = useAuth();
const router = useRouter();

onMounted(() => {
  initAuth();
  
  // Optional: Redirect to login if not authenticated
  if (!isLoggedIn.value && router.currentRoute.value.path !== '/') {
    router.push('/');
  }
});
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

nav {
  width: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: #f3f4f6;
}

nav a.router-link-active {
  color: #42b983;
  background-color: #ecfdf5;
}
</style> 