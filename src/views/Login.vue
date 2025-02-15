<template>
  <div class="page-container">
    <div class="content-container">
      <div class="login-section">
        <p class="login-text">Please log in to continue</p>
        
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
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import GoogleLogin from '../components/GoogleLogin.vue';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, signInWithName } = useAuth(router);

const nameInput = ref('');
const nameError = ref(false);

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
</script>

<style scoped>
/* Add your styles here */
</style> 