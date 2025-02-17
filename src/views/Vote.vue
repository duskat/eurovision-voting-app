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

      <div v-else class="results-wrapper">
        <h2 class="section-title">Your Votes</h2>
        
        <div class="vote-grid">
          <div v-for="(points, index) in [12, 10, 8]" :key="points" class="vote-row">
            <div class="points-box">{{ points }}</div>
            <div class="custom-select">
              <button 
                @click="toggleDropdown(index)"
                class="select-button"
                :class="{ 'active': activeDropdown === index }"
              >
                <span v-if="selectedCountries[index]">
                  <span class="country-flag">{{ getCountryFlag(selectedCountries[index].name) }}</span>
                  {{ selectedCountries[index].name }}
                </span>
                <span v-else>Select a country</span>
                <svg class="dropdown-arrow" :class="{ 'rotated': activeDropdown === index }">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div v-if="activeDropdown === index" class="dropdown-menu">
                <div class="dropdown-backdrop" @click="activeDropdown = null"></div>
                <div class="dropdown-content">
                  <button
                    v-for="country in availableCountries(index)"
                    :key="country.id"
                    @click="selectCountry(index, country)"
                    class="country-option"
                    :class="{ 'selected': selectedCountries[index]?.id === country.id }"
                  >
                    <span class="country-flag">{{ getCountryFlag(country.name) }}</span>
                    {{ country.name }}
                  </button>
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
            class="submit-vote-button"
          >
            Submit Vote
          </button>
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
/* Keep only component-specific styles */
.section-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.submit-vote-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: 500;
  width: 200px;
  margin: 2rem auto;
}

.submit-vote-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.submit-vote-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style> 