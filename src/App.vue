<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/vote">Vote</router-link>
      <router-link to="/leaderboard">Leaderboard</router-link>
      <div class="user-nav" v-if="isLoggedIn">
        <button 
          @click="toggleDropdown" 
          class="user-icon-button"
          :aria-expanded="isDropdownOpen"
          aria-haspopup="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="isDropdownOpen" class="user-dropdown">
          <div class="user-dropdown-content">
            <div class="user-info-header">
              <div class="user-name">
                {{ userType === 'guest' ? guestUser?.displayName : userName }}
              </div>
              <div class="user-type-label">
                {{ userType === 'guest' ? 'Guest Account' : 'Google Account' }}
              </div>
            </div>
            <button @click="handleLogout" class="dropdown-logout">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from './composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { isLoggedIn, userName, userType, logout, guestUser } = useAuth(router);
const isDropdownOpen = ref(false);

const closeDropdown = (e) => {
  const userNav = document.querySelector('.user-nav');
  if (userNav && !userNav.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const handleLogout = async () => {
  try {
    await logout();
    isDropdownOpen.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 100;
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

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #090979, #1b1b94, #4b0082);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 50;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
}

.user-info {
  color: white;
  font-weight: 500;
  padding: 0.75rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
}

.user-info-header {
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
}

.user-name {
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.user-type-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style> 