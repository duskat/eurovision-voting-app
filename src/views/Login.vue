<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="eurovision-title">EUROVISION VOTING 2025</h1>

      <div class="login-section">
        <!-- Auth Message -->
        <h2 v-if="authMessage" class="auth-notification">
          {{ authMessage }}
        </h2>
        
        <p class="login-text">Please enter at least 2 characters to continue.</p>
        
        <!-- Quick Login Form -->
        <form @submit.prevent="handleQuickLogin" class="quick-login-form">
          <div class="input-group">
            <input
              v-model="nameInput"
              type="text"
              name="name"
              placeholder="Enter your name"
              class="name-input"
              :class="{ 'error': nameError }"
              required
              minlength="2"
              maxlength="50"
              autocomplete="name"
            />
          </div>
          <button 
            type="submit" 
            class="guest-button" 
            :disabled="!isValidName"
          >
            Continue as Guest
          </button>
          <p class="quick-login-note">
            Quick login with name allows you to start voting instantly. 
            Note: Once you log out, you won't be able to edit your votes. 
            For permanent access, use Google login instead.
          </p>
        </form>

        <div class="divider">
          <span>or</span>
        </div>

        <div class="google-button-container">
          <GoogleLogin 
            @success="handleLoginSuccess" 
            @error="handleLoginError" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import GoogleLogin from '../components/GoogleLogin.vue';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, signInWithName, isLoggedIn } = useAuth();

const nameInput = ref('');
const nameError = ref(false);
const authMessage = computed(() => {
  const redirect = route.query.redirect;
  if (redirect === '/vote') {
    return 'To cast a vote, please log in.';
  } else if (redirect === '/leaderboard') {
    return 'To see vote results, you need to log in.';
  }
  return '';
});

const isValidName = computed(() => {
  const trimmedName = nameInput.value.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
});

const handleQuickLogin = async () => {
  nameError.value = false;
  const trimmedName = nameInput.value.trim();
  
  if (!isValidName.value) {
    nameError.value = true;
    return;
  }
  
  try {
    await signInWithName(trimmedName);
    nameInput.value = '';
    router.push(route.query.redirect || '/');
  } catch (error) {
    console.error('Quick login error:', error);
    nameError.value = true;
  }
};

const handleLoginSuccess = async (response) => {
  try {
    await login(response);
    router.push(route.query.redirect || '/');
  } catch (error) {
    console.error('Login error:', error);
  }
};

const handleLoginError = (error) => {
  console.error('Login failed:', error);
};

onMounted(() => {
  // If user is already logged in, redirect to intended route or default
  if (isLoggedIn.value) {
    const intendedRoute = localStorage.getItem('intendedRoute') || '/vote';
    localStorage.removeItem('intendedRoute'); // Clear stored route
    router.push(intendedRoute);
  }
});
</script>

<style scoped>
.login-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.login-text {
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  opacity: 0.9;
}

.auth-notification {
  margin-bottom: 2rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .login-section {
    padding: 1rem;
  }

  .auth-notification {
    font-size: 0.9rem;
    margin: 0 0 1.5rem 0;
  }

  .login-text {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
}
</style> 