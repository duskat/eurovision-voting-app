<template>
  <div class="page-container">
    <div class="content-container">
      <div class="title-container">
        <h1 class="page-title">Eurovision Voting</h1>
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
            <span v-if="isAdmin" class="admin-badge" title="Admin User">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.674 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
            </span>
          </h2>
          <button @click="handleLogout" class="logout-button">
            <svg class="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
        <p class="welcome-text">Ready to cast your votes for Eurovision?</p>
        <div class="action-buttons">
          <router-link to="/vote" class="primary-button">Cast Your Vote</router-link>
          <router-link to="/leaderboard" class="secondary-button">View Leaderboard</router-link>
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
        <div class="user-info">
          <p class="user-type">
            Logged in as {{ userType === 'guest' ? 'Guest' : 'Google User' }}
          </p>
        </div>
      </div>

      <!-- Login State -->
      <div v-else class="login-section">
        <h2 class="page-title">Eurovision Voting App</h2>
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

const isValidName = computed(() => {
  const trimmedName = nameInput.value.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
});

// Computed property to get the correct user name
const userName = computed(() => {
  if (user.value?.type === 'google') {
    return user.value.displayName;
  } else if (guestUser.value) {
    return guestUser.value.displayName;
  }
  return '';
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
    // Clear input after successful login
    nameInput.value = '';
    router.push('/vote');
  } catch (error) {
    console.error('Quick login error:', error);
    nameError.value = true;
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

const isAdmin = computed(() => user.value?.email === 'dprybysh@gmail.com');

// Admin functions
const confirmReset = async () => {
  if (confirm('Are you sure you want to reset all votes? This action cannot be undone.')) {
    try {
      isResetting.value = true;
      await resetAllResults();
      router.push('/leaderboard');
    } catch (err) {
      console.error('Error resetting votes:', err);
    } finally {
      isResetting.value = false;
    }
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
.welcome-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-direction: column;
}

.welcome-text {
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background-color: #EEF2FF;
  color: #4F46E5;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #E0E7FF;
}

.logout-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.secondary-button {
  padding: 0.875rem 1.5rem;
  border-radius: 100px;
  background: white;
  color: #4F46E5;
  border: 2px solid #E0E7FF;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background: #EEF2FF;
  border-color: #4F46E5;
}

.login-section {
  text-align: center;
}

.login-text {
  font-size: 1.1rem;
  color: #6B7280;
  margin-bottom: 2rem;
  text-align: center;
}

.quick-login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  width: 100%;
}

.name-input {
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.name-input::placeholder {
  color: #9CA3AF;
}

.name-input:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.name-input.error {
  border-color: #EF4444;
  background-color: #FEF2F2;
}

.error-message {
  font-size: 0.875rem;
  color: #EF4444;
}

.guest-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 100px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(90deg, #4CC9F0 0%, #7209B7 100%);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.guest-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.guest-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quick-login-note {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6B7280;
  background-color: #F3F4F6;
  padding: 1rem;
  border-radius: 0.75rem;
  line-height: 1.4;
  text-align: left;
}

.divider {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #E5E7EB;
}

.divider span {
  color: #6B7280;
  font-size: 0.875rem;
  padding: 0 0.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.user-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #F3F4F6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.primary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%);
}

@media (max-width: 640px) {
  .user-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .name-input {
    font-size: 16px; /* Prevents zoom on mobile */
  }
}

.admin-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #4F46E5;
  width: 25px;
  height: 25px;
  align-items: center;
  vertical-align: middle;
  margin-left: 0.5rem;
  justify-content: center;
}
.admin-danger-button svg {
  width: 20px !important;
  height: 20px;
}

.user-header h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-controls {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
}

.admin-danger-button {
  padding: 0.875rem 1.5rem;
  border-radius: 100px;
  background: #EF4444;
  color: white;
  border: none;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.admin-danger-button:hover {
  background: #EF4444;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 400px;
}
</style>