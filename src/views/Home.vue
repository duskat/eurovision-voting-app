<template>
  <div class="page-container">
    <div class="content-container">
      <div class="title-container">
        <h1 class="eurovision-title">EUROVISION VOTING 2025</h1>
      </div>



      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>

      <!-- Logged In State -->
      <div v-else-if="isLoggedIn" class="welcome-section">
        <div class="user-header">
          <h2 class="page-title">
            Welcome, {{ userName }}!
          </h2>
          <div v-if="isAdmin" class="admin-status" title="As a party admin, you have extra controls for managing users and votes">
            <svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
              <path d="M15.5 15.5l1.5.5-1.5 4-1.5-.5zM9 16l1.5-.5 1.5 4-1.5.5z"/>
              <circle cx="12" cy="8" r="2"/>
              <path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm7 5H5v-1c0-.6 2.67-2 7-2s7 1.4 7 2v1z"/>
            </svg>
            <span>You are the party admin</span>
          </div>
        </div>
        <div class="user-type">
          <p class="user-type-label">
            Logged in as {{ userType === 'guest' ? 'Guest' : 'Google User' }}
          </p>
        </div>
        <p class="welcome-text">Ready to cast your votes for Eurovision?</p>
        <div class="action-buttons">
          <button @click="router.push('/vote')" class="primary-button">Cast Your Vote</button>
          <button @click="router.push('/leaderboard')" class="secondary-button">View Leaderboard</button>
        </div>
        <!-- Admin Controls (only show for admin) -->
        <div v-if="isAdmin" class="admin-controls">
          <button
            @click="showDeleteUsersModal = true"
            class="admin-danger-button flex items-center justify-center gap-2 rounded-full"
            :disabled="isDeletingUsers"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span v-if="isDeletingUsers">Deleting Users...</span>
            <span v-else>Delete All Users</span>
          </button>

          <button
            @click="confirmReset"
            class="admin-danger-button flex items-center justify-center gap-2 rounded-full"
            :disabled="isResetting"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
            </svg>
            <span v-if="isResetting">Resetting...</span>
            <span v-else>Reset All Votes</span>
          </button>
        </div>
        <button @click="handleLogout" class="logout-button">
          <svg data-v-2dc54a20="" class="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path data-v-2dc54a20="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>

      <!-- Login State -->
      <div v-else class="login-section">
        <p class="login-text">Please log in to continue</p>
        
        <!-- Quick Login Form -->
        <form @submit.prevent="handleQuickLogin" class="quick-login-form">
          <div class="input-group">
            <input
              id="name-input"
              v-model="nameInput"
              type="text"
              name="name"
              placeholder="Enter your name"
              class="name-input"
              :class="{ 'input-error': nameError || errorMessage }"
              required
              minlength="2"
              maxlength="50"
              autocomplete="name"
              @input="clearError"
            />
            <p v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </p>
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
          <GoogleLogin @success="handleLoginSuccess" @error="handleLoginError" />
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Users Confirmation Modal -->
  <div v-if="showDeleteUsersModal" class="modal-backdrop">
    <div class="modal-content">
      <h3 class="text-xl font-bold mb-4">Delete All Users</h3>
      <div class="text-gray-600 mb-6">
        <p class="mb-2">Are you sure you want to delete all users?</p>
        <p class="mb-2">This will:</p>
        <ul class="list-disc ml-6 mt-2">
          <li>Remove all user accounts</li>
          <li>Delete all associated votes</li>
          <li>This action cannot be undone</li>
        </ul>
      </div>
      <div class="flex justify-end space-x-4">
        <button
          @click="showDeleteUsersModal = false"
          class="secondary-button"
        >
          Cancel
        </button>
        <button
          @click="deleteAllUsers"
          class="admin-danger-button"
          :disabled="isDeletingUsers"
        >
          {{ isDeletingUsers ? 'Deleting...' : 'Delete All Users' }}
        </button>
      </div>
    </div>
  </div>

  <!-- Reset Votes Confirmation Modal -->
  <div v-if="showResetModal" class="modal-backdrop">
    <div class="modal-content">
      <h3 class="text-xl font-bold mb-4">Reset All Votes</h3>
      <div class="text-gray-600 mb-6">
        <p class="mb-2">Are you sure you want to reset all votes?</p>
        <p class="mb-2">This will:</p>
        <ul class="list-disc ml-6 mt-2">
          <li>Remove all existing votes</li>
          <li>Reset the leaderboard</li>
          <li>Allow users to vote again</li>
          <li>This action cannot be undone</li>
        </ul>
      </div>
      <div class="flex justify-end space-x-4">
        <button
          @click="showResetModal = false"
          class="secondary-button"
        >
          Cancel
        </button>
        <button
          @click="handleResetConfirm"
          class="admin-danger-button"
          :disabled="isResetting"
        >
          {{ isResetting ? 'Resetting...' : 'Yes, Reset Votes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import GoogleLogin from '../components/GoogleLogin.vue';
import { useAuth } from '../composables/useAuth';
import { useVoting } from '../composables/useVoting';
import { db } from '../firebase/config';
import { runTransaction, getDocs, collection } from 'firebase/firestore';

const router = useRouter();
const { 
  isLoggedIn, 
  userType,
  login, 
  logout, 
  signInWithName,
  isLoading,
  user,
  guestUser
} = useAuth(router);
const { resetAllResults } = useVoting();

const nameInput = ref('');
const nameError = ref(false);
const errorMessage = ref('');

const isValidName = computed(() => {
  const trimmedName = nameInput.value.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
});

// Computed property to get the correct user name
const userName = computed(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    return userData.displayName;
  }
  return guestUser.value?.displayName || '';
});

const clearError = () => {
  errorMessage.value = '';
  nameError.value = false;
};

const handleQuickLogin = async () => {
  nameError.value = false;
  errorMessage.value = '';
  const trimmedName = nameInput.value.trim();
  
  if (!isValidName.value) {
    nameError.value = true;
    return;
  }
  
  try {
    await signInWithName(trimmedName);
    nameInput.value = '';
    router.push('/');
  } catch (error) {
    console.error('Quick login error:', error);
    if (error.code === 'auth/username-already-in-use') {
      errorMessage.value = 'This name is already taken. Please choose a different name.';
    } else {
      errorMessage.value = 'This name is already taken. Please choose a different name.';
    }
  }
};

const handleLoginSuccess = async (response) => {
  try {
    await login(response);
    router.push('/vote');
  } catch (error) {
    console.error('Login error:', error);
  }
};

const handleLoginError = (error) => {
  console.error('Login failed:', error);
};

const handleLogout = async () => {
  try {
    await logout();
    router.push('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const showDeleteUsersModal = ref(false);
const isDeletingUsers = ref(false);
const isResetting = ref(false);
const showResetModal = ref(false);

const isAdmin = computed(() => user.value?.email === 'dprybysh@gmail.com');

// Admin functions
const confirmReset = async () => {
  showResetModal.value = true;
};

const handleResetConfirm = async () => {
  try {
    isResetting.value = true;
    await resetAllResults();
    showResetModal.value = false;
    router.push('/leaderboard');
  } catch (err) {
    console.error('Error resetting votes:', err);
  } finally {
    isResetting.value = false;
  }
};

const deleteAllUsers = async () => {
  try {
    isDeletingUsers.value = true;
    await runTransaction(db, async (transaction) => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const guestUsersSnapshot = await getDocs(collection(db, 'guestUsers'));
      const votesSnapshot = await getDocs(collection(db, 'votes'));

      usersSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });
      guestUsersSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });
      votesSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });
    });
    showDeleteUsersModal.value = false;
    router.go(0); // Refresh the page
  } catch (err) {
    console.error('Error deleting users:', err);
  } finally {
    isDeletingUsers.value = false;
  }
};
</script>

<style scoped>
/* Remove .content-container styles */
</style>
