<template>
  <div 
    class="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300"
    :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'"
  >
    <!-- Theme Toggle -->
    <button 
      @click="toggleTheme" 
      class="fixed top-4 right-4 p-2 rounded-full transition-colors duration-300"
      :class="isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800 shadow-lg'"
    >
      <svg v-if="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <!-- Main Content -->
    <div class="w-full max-w-md">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-30"></div>
          <h1 
            class="relative text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r transition-colors duration-300"
            :class="isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'"
          >
            Eurovision
          </h1>
        </div>
        <p 
          class="text-lg font-medium transition-colors duration-300"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'"
        >
          Vote for your favorites
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>

      <div v-else-if="!user && !guestUser" class="space-y-6">
        <!-- Name-based login -->
        <div 
          class="rounded-2xl p-6 backdrop-blur-lg transition-all duration-300"
          :class="isDark ? 'bg-gray-800/50' : 'bg-white/80 shadow-xl'"
        >
          <h2 
            class="text-xl font-semibold mb-4 transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-800'"
          >
            Quick Login
          </h2>
          <div class="space-y-4">
            <div class="relative">
              <input
                id="name"
                v-model="name"
                type="text"
                class="w-full px-4 py-3 rounded-xl border-2 bg-transparent transition-all duration-300 focus:ring-2 focus:ring-offset-2"
                :class="isDark ? 'border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500' : 'border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500'"
                placeholder="Enter your name"
                @keyup.enter="handleNameLogin"
              />
              <!-- Error Message -->
              <div
                v-if="nameError"
                class="absolute -bottom-6 left-0 text-sm text-red-500"
              >
                {{ nameError }}
              </div>
            </div>

            <!-- Login Information Note -->
            <div 
              class="p-4 rounded-lg text-sm"
              :class="isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-blue-50 text-gray-600'"
            >
              <p class="mb-2">
                <span class="font-medium">Quick Login:</span> You can log in with your name to start voting right away.
              </p>
              <p>
                <span class="font-medium">Note:</span> Once you log out, you won't be able to edit your votes. To edit your votes later, please use Google login instead.
              </p>
            </div>

            <button
              @click="handleNameLogin"
              class="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="isDark ? 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500' : 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500'"
              :disabled="isLoading || !name.trim()"
            >
              Continue with Name
            </button>
          </div>
        </div>

        <!-- Google login -->
        <div 
          class="rounded-2xl p-6 backdrop-blur-lg transition-all duration-300"
          :class="isDark ? 'bg-gray-800/50' : 'bg-white/80 shadow-xl'"
        >
          <h2 
            class="text-xl font-semibold mb-4 transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-800'"
          >
            Or Sign In With
          </h2>
          <button
            @click="handleGoogleLogin"
            class="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-2"
            :class="isDark ? 'bg-white hover:bg-gray-100 text-gray-900' : 'bg-white hover:bg-gray-50 text-gray-900 shadow-md'"
            :disabled="isLoading"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>

      <!-- Authenticated State -->
      <div 
        v-else 
        class="text-center space-y-6 rounded-2xl p-6 backdrop-blur-lg transition-all duration-300"
        :class="isDark ? 'bg-gray-800/50' : 'bg-white/80 shadow-xl'"
      >
        <h2 
          class="text-2xl font-semibold transition-colors duration-300"
          :class="isDark ? 'text-white' : 'text-gray-800'"
        >
          Welcome, {{ user?.displayName || guestUser?.displayName }}!
        </h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/vote"
            class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'"
          >
            Vote Now
          </router-link>
          <router-link
            to="/leaderboard"
            class="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="isDark ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'"
          >
            View Leaderboard
          </router-link>
        </div>
        <button
          @click="handleLogout"
          :disabled="logoutStatus.loading"
          class="w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 relative"
          :class="isDark ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'"
        >
          <span :class="{ 'opacity-0': logoutStatus.loading }">Logout</span>
          <!-- Loading Spinner -->
          <div
            v-if="logoutStatus.loading"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </button>
        <!-- Error Message -->
        <div
          v-if="logoutStatus.error"
          class="text-red-500 text-sm mt-2"
        >
          {{ logoutStatus.error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user, guestUser, error, isLoading, signInWithGoogle, signInWithName, logout } = useAuth(router);
const name = ref('');
const isDark = ref(localStorage.getItem('theme') === 'dark');
const nameError = ref('');
const logoutStatus = ref({ loading: false, error: null });

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDark.value);
};

const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle();
    router.push('/vote');
  } catch (err) {
    console.error('Google login error:', err);
    nameError.value = 'Failed to sign in with Google. Please try again.';
  }
};

const handleNameLogin = async () => {
  try {
    nameError.value = '';
    const trimmedName = name.value.trim();
    
    // Basic validation
    if (!trimmedName) {
      nameError.value = 'Please enter your name';
      return;
    }
    
    if (trimmedName.length < 2) {
      nameError.value = 'Name must be at least 2 characters long';
      return;
    }

    await signInWithName(trimmedName);
    router.push('/vote');
  } catch (err) {
    console.error('Login error:', err);
    nameError.value = err.message;
    
    // Specific error handling
    if (err.message.includes('already taken')) {
      nameError.value = 'This name is already in use. Please try another one.';
    } else {
      nameError.value = 'Failed to sign in. Please try again.';
    }
  }
};

const handleLogout = async () => {
  // Prevent multiple clicks
  if (logoutStatus.value.loading) return;
  
  logoutStatus.value = { loading: true, error: null };
  try {
    await logout();
    // Clear all form data and state
    name.value = '';
    nameError.value = '';
    
    // Force a page reload to reset all state
    window.location.href = '/';
  } catch (err) {
    console.error('Logout error:', err);
    logoutStatus.value.error = 'Failed to logout. Please try again.';
  } finally {
    logoutStatus.value.loading = false;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Inter', sans-serif;
}

.dark {
  color-scheme: dark;
}

/* Add these new styles for toast animations */
.translate-y-0 {
  transform: translateY(0);
}

.translate-y-2 {
  transform: translateY(0.5rem);
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>