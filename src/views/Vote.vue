<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="eurovision-title">EUROVISION VOTING 2025</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading countries...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="loadCountries" class="primary-button">Try Again</button>
      </div>

      <div v-else class="form-container">
        <!-- Vote Submitted Message -->
        <div v-if="voteSubmitted" class="success-message">
          <h2 class="text-xl font-semibold text-green-800 mb-4">
            {{ selectedCountries.some(c => c) ? 'Your votes have been updated!' : 'Your vote has been submitted!' }}
          </h2>
          <div class="submitted-votes">
            <div v-for="(country, index) in selectedCountries" :key="country?.id" class="vote-item">
              <span class="points">{{ [12, 10, 8][index] }} points:</span>
              <span class="country">{{ country?.name }}</span>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="router.push('/leaderboard')" class="view-results-button">
              View Results
            </button>
            <button 
              v-if="canUpdateVote" 
              @click="startNewVote" 
              class="update-vote-button"
            >
              Update Vote
            </button>
          </div>
        </div>

        <!-- Voting Section -->
        <div v-else class="voting-section">
          <h2 class="section-title">Your Votes</h2>
          
          <!-- Vote Slots -->
          <div class="votes-container">
            <div v-for="(points, index) in [12, 10, 8]" :key="points" class="vote-select-container">
              <div class="points-label">{{ points }} points</div>
              <div class="custom-select" :data-active="activeDropdown === index">
                <button 
                  @click="toggleDropdown(index)"
                  class="select-button"
                  :class="{ 'active': activeDropdown === index }"
                  :data-dropdown-index="index"
                >
                  <span v-if="selectedCountries[index]">
                    <span class="country-flag">{{ getCountryFlag(selectedCountries[index].name) }}</span>
                    {{ selectedCountries[index].name }}
                  </span>
                  <span v-else>Select a country</span>
                  <svg 
                    class="dropdown-arrow"
                    :class="{ 'rotated': activeDropdown === index }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>

                <div v-if="activeDropdown === index">
                  <div class="dropdown-backdrop" @click="activeDropdown = null"></div>
                  <div class="dropdown-menu" :class="{ 'dropdown-down': getDropdownPosition(index) === 'down' }">
                    <div class="dropdown-content">
                      <button
                        v-for="country in availableCountries(index)"
                        :key="country.id"
                        @click="selectCountry(index, country)"
                        class="country-option"
                        :class="{ 'selected': selectedCountries[index]?.id === country.id }"
                      >
                        <span class="country-flag" role="img" aria-label="country flag">
                          {{ getCountryFlag(country.name) }}
                        </span>
                        {{ country.name }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="button-container">
            <button
              @click="submitVotes"
              :disabled="!isValid"
              class="primary-button"
            >
              Submit Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useVoting } from '../composables/useVoting';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { getCountryFlag } from '../utils/countryFlags';

const router = useRouter();
const { user } = useAuth();
const { 
  countries, 
  error,
  isLoading, 
  hasVoted, 
  submitVotes: submit, 
  checkExistingVote, 
  canUpdateVote,
  clearVotes,
  loadCountries
} = useVoting();
const selectedCountries = ref([null, null, null]);
const voteSubmitted = ref(false);
const isModifying = ref(false);
const activeDropdown = ref(null);

const isValid = computed(() => {
  return selectedCountries.value.every(country => country) &&
         new Set(selectedCountries.value).size === 3;
});

const availableCountries = (index) => {
  return countries.value.filter(country => {
    return !selectedCountries.value.includes(country) || 
           selectedCountries.value[index] === country;
  });
};

const startModifying = () => {
  isModifying.value = true;
};

const loadExistingVotes = async () => {
  try {
    const existingVote = await checkExistingVote();
    if (existingVote) {
      const votedCountries = existingVote.votes
        .sort((a, b) => b.points - a.points)
        .map(vote => countries.value.find(country => country.id === vote.countryId));
      
      selectedCountries.value = votedCountries;
      voteSubmitted.value = true;
    }
  } catch (err) {
    console.error('Error loading existing votes:', err);
    error.value = 'Failed to load your previous votes';
  }
};

const submitVotes = async () => {
  if (isValid.value) {
    try {
      await submit(selectedCountries.value);
      voteSubmitted.value = true;
      error.value = null;
      
      // Show success message and redirect
      setTimeout(() => {
        router.push('/leaderboard');
      }, 2000);
    } catch (err) {
      console.error('Error submitting votes:', err);
      error.value = 'Failed to submit votes. Please try again.';
    }
  }
};

const getDropdownPosition = (index) => {
  const button = document.querySelector(`[data-dropdown-index="${index}"]`);
  if (!button) return 'down';

  const rect = button.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  
  // If mobile, always show from bottom
  if (window.innerWidth <= 768) return 'up';
  
  // If there's more space below than above, or not enough space above
  if (spaceBelow >= 300 || spaceAbove < 300) {
    return 'down';
  }
  
  return 'up';
};

const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index;
  if (activeDropdown.value !== null) {
    document.body.classList.add('dropdown-open');
    nextTick(() => {
      const dropdown = document.querySelector('.dropdown-menu');
      if (dropdown) {
        dropdown.classList.add('active');
      }
    });
  } else {
    document.body.classList.remove('dropdown-open');
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.remove('active');
    }
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.custom-select')) {
    activeDropdown.value = null;
  }
};

// Watch for user changes to load their votes
watch(() => user.value?.type, async (newType) => {
  if (newType === 'google') {
    const existingVote = await checkExistingVote();
    if (existingVote) {
      const votedCountries = existingVote.votes
        .sort((a, b) => b.points - a.points)
        .map(vote => countries.value.find(country => country.id === vote.countryId));
      
      selectedCountries.value = votedCountries;
      voteSubmitted.value = true;
    }
  }
}, { immediate: true });

onMounted(() => {
  loadExistingVotes();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.classList.remove('dropdown-open');
});

const selectCountry = (index, country) => {
  selectedCountries.value[index] = country;
  activeDropdown.value = null;
  document.body.classList.remove('dropdown-open');
};

// Update startNewVote to handle vote clearing
const startNewVote = async () => {
  try {
    await clearVotes();
    selectedCountries.value = [null, null, null];
    voteSubmitted.value = false;
    error.value = null;
  } catch (err) {
    console.error('Error starting new vote:', err);
    error.value = 'Failed to clear previous vote. Please try again.';
  }
};
</script>

<style scoped>
/* Container styles */
.votes-container {
  position: relative;
  z-index: 1;
  width: 100%;
}

.vote-select-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

/* Points label */
.points-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary-light);
  min-width: 100px;
  text-align: right;
  padding-right: 1rem;
  border-right: 2px solid var(--color-gray-200);
}

/* Select container */
.custom-select {
  position: relative;
  flex: 1;
  min-width: 0; /* Prevent flex item from overflowing */
  box-sizing: border-box;
}

/* Select button */
.select-button {
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  color: #1F2937;
  cursor: pointer;
  transition: border-color 0.2s;
}

.select-button:hover {
  border-color: #d1d1d1;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  top: 100%;
  margin-top: 0.5rem;
  padding: 8px 0;
}

.dropdown-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

/* Country options */
.country-option {
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.country-option:hover {
  background: #f5f5f5;
}

.country-flag {
  font-size: 1.25rem;
  margin-right: 8px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .vote-select-container {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.5rem;
  }

  .points-label {
    width: 100%;
    text-align: left;
    padding-right: 0;
    border-right: none;
    border-bottom: 2px solid var(--color-gray-200);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .dropdown-menu {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    margin: 0;
    border-radius: 16px 16px 0 0;
    padding: 16px;
    max-height: 80vh;
    width: 90%;
  }

  .dropdown-content {
    max-height: 70vh;
    padding: 8px 0;
  }

  .dropdown-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    backdrop-filter: blur(2px);
  }

  /* Animate dropdown on mobile */
  .dropdown-menu {
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dropdown-menu.active {
    transform: translateY(0);
  }

  /* Prevent body scroll when dropdown is open */
  body.dropdown-open {
    overflow: hidden;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-4);
    padding: 0 var(--spacing-4);
  }
  
  .view-results-button,
  .update-vote-button {
    width: 100%;
    text-align: center;
  }
}

/* Success message container */
.success-message {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Add styles for submitted votes display */
.submitted-votes {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vote-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.75rem;
}

.points {
  font-weight: 600;
  color: #059669;
}

.country {
  color: #1F2937;
  font-weight: 500;
}

/* When dropdown is active, increase z-index */
.custom-select:has(.dropdown-menu[style*="display: block"]),
.custom-select:focus-within {
  z-index: 50;
}

/* Update button container styles */
.button-container {
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
}

/* Add styles for the view results button */
.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4);
  width: 100%;
}

.view-results-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #4F46E5;
  color: white;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.view-results-button:hover {
  background: #4338CA;
  transform: translateY(-1px);
}

/* Add styles for update vote button */
.update-vote-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #059669;
  color: white;
  border-radius: 100px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.update-vote-button:hover {
  background: #047857;
  transform: translateY(-1px);
}

/* Add error message styles */
.error-message {
  color: #ef4444;
  background-color: #fee2e2;
  padding: 0.75rem;
  border-radius: 0.75rem;
  margin: 1rem 0;
  text-align: center;
}

.select-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: #374151;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.points-label {
  font-size: 1.125rem;
  color: #3b82f6;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.vote-group {
  margin-bottom: 2rem;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

select option {
  padding: 0.5rem;
}
</style> 