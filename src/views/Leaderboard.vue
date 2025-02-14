<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Eurovision Leaderboard</h1>

      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading leaderboard...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
        <button 
          @click="loadResults" 
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>

      <!-- Results -->
      <div v-else>
        <!-- Total Votes Counter -->
        <div class="mb-6 space-y-4">
          <div class="text-center">
            <p class="text-gray-600">
              Total Votes Cast: <span class="font-bold">{{ totalVotes }}</span>
            </p>
          </div>

          <!-- Voters List with Clickable Names -->
          <div v-if="voters.length > 0" class="mt-8">
            <h3 class="text-lg font-semibold mb-3">Voters:</h3>
            <div class="space-y-2">
              <button
                v-for="voter in voters"
                :key="voter.id"
                @click="showVoterDetails(voter)"
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                {{ voter.displayName }}
              </button>
            </div>
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="overflow-hidden rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(country, index) in sortedResults" 
                :key="country.name"
                :class="{
                  'bg-yellow-50': index === 0,
                  'bg-gray-50': index === 1,
                  'bg-orange-50': index === 2
                }"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span 
                      class="w-8 h-8 flex items-center justify-center rounded-full font-bold"
                      :class="{
                        'bg-yellow-500 text-white': index === 0,
                        'bg-gray-400 text-white': index === 1,
                        'bg-orange-500 text-white': index === 2,
                        'bg-blue-100 text-blue-800': index > 2
                      }"
                    >
                      {{ index + 1 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <span class="text-xl" role="img" aria-label="country flag">
                      {{ getCountryFlag(country.name) }}
                    </span>
                    <span class="text-sm font-medium text-gray-900">
                      {{ country.name }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-sm font-bold">
                    {{ country.totalPoints }} points
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Results Message -->
        <div v-if="sortedResults.length === 0" class="text-center py-8">
          <p class="text-gray-600">No results available yet</p>
        </div>

        <!-- Navigation -->
        <div class="mt-8 flex justify-between items-center">
          <router-link
            to="/"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Home
          </router-link>
          <router-link
            to="/vote"
            class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Cast Your Vote
          </router-link>
        </div>

        <!-- Reset Button (only show for admin) -->
        <div v-if="isGoogleUser" class="mt-4 text-center">
          <button
            @click="handleReset"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-2 mx-auto"
            :disabled="isResetting"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <span v-if="isResetting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Resetting...
            </span>
            <span v-else>Admin Reset</span>
          </button>
        </div>

        <!-- Reset Confirmation Modal -->
        <div v-if="showResetModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 class="text-xl font-bold mb-4">Confirm Reset</h3>
            <div class="text-gray-600 mb-6">
              <p class="mb-2">Are you sure you want to reset all points?</p>
              <p class="mb-2">This will:</p>
              <ul class="list-disc ml-6 mt-2">
                <li>Set all country points to zero</li>
                <li>Delete all existing votes</li>
                <li>This action cannot be undone</li>
              </ul>
            </div>
            <div class="flex justify-end space-x-4">
              <button
                @click="showResetModal = false"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                @click="confirmReset"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                :disabled="isResetting"
              >
                {{ isResetting ? 'Resetting...' : 'Yes, Reset All' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Reset Result Message -->
        <div v-if="resetMessage" 
          :class="[
            'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-500',
            resetError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          ]"
        >
          {{ resetMessage }}
        </div>
      </div>

      <!-- Voter Details Modal -->
      <div
        v-if="selectedVoter"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex justify-between items-center mb-6 pb-3 border-b">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ selectedVoter.userDisplayName }}'s Votes
            </h3>
            <button 
              @click="closeModal" 
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              title="Close details"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Close</span>
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="vote in selectedVoter.votes"
              :key="vote.countryId"
              class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span class="font-medium">{{ vote.countryName }}</span>
              <span class="text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {{ vote.points }} points
              </span>
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-500">
            Voted: {{ formatVoteTime(selectedVoter.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { useVoting } from '../composables/useVoting';
import { useAuth } from '../composables/useAuth';
import { getCountryFlag } from '../utils/countryFlags';

defineOptions({
  name: 'Leaderboard'
});

const resetMessageTimeout = ref(null);

const results = ref([]);
const isLoading = ref(true);
const error = ref(null);
const unsubscribeResults = ref(null);
const unsubscribeVoters = ref(null);
const resetMessage = ref('');
const resetError = ref(false);
const selectedVoter = ref(null);

const { user } = useAuth();
const { resetAllResults } = useVoting();
const isResetting = ref(false);
const showResetModal = ref(false);

const voters = ref([]);

// Sort results by points in descending order, then alphabetically
const sortedResults = computed(() => {
  return [...results.value].sort((a, b) => {
    // First sort by points (descending)
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    // If points are equal, sort alphabetically by country name
    return a.name.localeCompare(b.name);
  });
});

// Calculate total votes (each vote contributes 30 points: 12 + 10 + 8)
const totalVotes = computed(() => {
  const totalPoints = results.value.reduce((sum, country) => sum + country.totalPoints, 0);
  return Math.round(totalPoints / 30);
});

const isGoogleUser = computed(() => {
  const userEmail = user.value?.email;
  return userEmail === 'dprybysh@gmail.com';
});

const loadResults = () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const resultsQuery = query(
      collection(db, 'results'),
      orderBy('totalPoints', 'desc')
    );

    unsubscribeResults.value = onSnapshot(
      resultsQuery,
      (snapshot) => {
        results.value = snapshot.docs.map(doc => ({
          name: doc.id,
          totalPoints: doc.data().totalPoints || 0
        }));
        isLoading.value = false;
      },
      (err) => {
        console.error('Error loading results:', err);
        error.value = 'Failed to load leaderboard. Please try again.';
        isLoading.value = false;
      }
    );
  } catch (err) {
    console.error('Error setting up listener:', err);
    error.value = 'Failed to connect to leaderboard. Please try again.';
    isLoading.value = false;
  }
};

const handleReset = () => {
  showResetModal.value = true;
};

const confirmReset = async () => {
  isResetting.value = true;
  resetError.value = false;
  resetMessage.value = '';
  
  try {
    await resetAllResults();
    showResetModal.value = false;
    resetMessage.value = 'All points have been reset successfully';
    resetError.value = false;
  } catch (error) {
    console.error('Error resetting points:', error);
    resetMessage.value = 'Failed to reset points. Please try again.';
    resetError.value = true;
  } finally {
    isResetting.value = false;
    
    // Clear the message after 5 seconds
    if (resetMessageTimeout.value) clearTimeout(resetMessageTimeout.value);
    resetMessageTimeout.value = setTimeout(() => {
      resetMessage.value = '';
    }, 5000);
  }
};

// Format timestamp
const formatVoteTime = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Show voter details
const showVoterDetails = (voter) => {
  selectedVoter.value = voter;
};

// Close modal
const closeModal = () => {
  selectedVoter.value = null;
};

// Load votes and voters
const loadVoters = async () => {
  try {
    const processedUsers = new Set();
    const votersList = [];

    const votesSnapshot = await getDocs(collection(db, 'votes'));
    
    await Promise.all(votesSnapshot.docs.map(async (voteDoc) => {
      const voteData = voteDoc.data();
      const userId = voteData.userId;

      // Skip if no userId or already processed
      if (!userId || processedUsers.has(userId)) return;
      processedUsers.add(userId);

      try {
        let voterName = '';
        let isGuest = false;

        // Check if it's a guest user ID
        if (userId && userId.startsWith('guest_')) {
          const guestRef = doc(db, 'guestUsers', userId);
          const guestDoc = await getDoc(guestRef);
          if (guestDoc.exists()) {
            voterName = guestDoc.data().displayName;
            isGuest = true;
          }
        } else if (userId) { // Regular user
          const userRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            voterName = userDoc.data().displayName;
          }
        }

        if (voterName) {
          votersList.push({
            id: voteDoc.id,
            displayName: voterName,
            userDisplayName: voterName, // Add this for modal display
            isGuest,
            timestamp: voteData.timestamp,
            votes: voteData.votes, // Include the votes data
            userId: userId // Include userId for reference
          });
        }
      } catch (err) {
        console.error(`Error fetching user ${userId}:`, err);
      }
    }));

    // Sort voters by timestamp, most recent first
    voters.value = votersList.sort((a, b) => {
      if (!a.timestamp || !b.timestamp) return 0;
      return b.timestamp.seconds - a.timestamp.seconds;
    });
  } catch (err) {
    console.error('Error loading voters:', err);
    error.value = 'Failed to load voters list';
  }
};

onMounted(() => {
  loadResults();
  loadVoters();
});

onUnmounted(() => {
  // Cleanup listeners
  if (typeof unsubscribeResults.value === 'function') {
    unsubscribeResults.value();
  }
  if (typeof unsubscribeVoters.value === 'function') {
    unsubscribeVoters.value();
  }
  if (resetMessageTimeout.value) {
    clearTimeout(resetMessageTimeout.value);
  }
});
</script> 