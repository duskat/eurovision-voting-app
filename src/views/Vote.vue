<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Eurovision Voting</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading countries...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button 
          @click="loadCountries" 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>

      <div v-else class="space-y-8">
        <!-- Vote Submitted Message -->
        <div v-if="voteSubmitted && !isModifying" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 class="text-xl font-semibold text-green-800 mb-4">Your vote has been submitted!</h2>
          <button
            @click="startModifying"
            class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Modify Vote
          </button>
        </div>

        <!-- Voting Section -->
        <div v-if="!voteSubmitted || isModifying" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Your Votes</h2>
          
          <!-- Vote Slots -->
          <div class="space-y-4">
            <div v-for="(points, index) in [12, 10, 8]" :key="points" class="flex items-center space-x-4">
              <span class="w-24 font-medium">{{ points }} points:</span>
              <select 
                v-model="selectedCountries[index]"
                class="flex-1 p-2 border rounded-md"
                :disabled="isLoading"
              >
                <option value="">Select a country</option>
                <option 
                  v-for="country in availableCountries(index)" 
                  :key="country.id"
                  :value="country"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-6">
            <button
              @click="submitVotes"
              :disabled="!isValid"
              class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isModifying ? 'Update Vote' : 'Submit Vote' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVoting } from '../composables/useVoting';
import { useRouter } from 'vue-router';

const router = useRouter();
const { countries, error, isLoading, currentVote, submitVotes: submit, checkExistingVote } = useVoting();
const selectedCountries = ref([null, null, null]);
const voteSubmitted = ref(false);
const isModifying = ref(false);

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

const submitVotes = async () => {
  if (isValid.value) {
    try {
      await submit(selectedCountries.value);
      voteSubmitted.value = true;
      isModifying.value = false;
      router.push('/leaderboard');
    } catch (err) {
      console.error('Error submitting votes:', err);
      error.value = 'Failed to submit votes. Please try again.';
    }
  }
};

// Load existing vote if any
onMounted(async () => {
  const existingVote = await checkExistingVote();
  if (existingVote) {
    // Map the existing votes to countries
    const votedCountries = existingVote.votes
      .sort((a, b) => b.points - a.points) // Sort by points (12, 10, 8)
      .map(vote => countries.value.find(country => country.id === vote.countryId));
    
    selectedCountries.value = votedCountries;
    voteSubmitted.value = true;
  }
});
</script>

<style>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style> 