<template>
  <div class="page-container">
    <div class="content-container">
      <h1 class="eurovision-title">EUROVISION 2025</h1>

      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Loading leaderboard...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">{{ error }}</p>
        <button 
          @click="loadResults" 
          class="primary-button"
        >
          Retry
        </button>
      </div>

      <!-- Results -->
      <div v-else>
        <!-- Total Votes Counter -->
        <div class="votes-section">
          <div class="text-left">
            <p class="text-gray-600">
              Total Votes Cast: <span class="font-bold text-lg">{{ totalVotes }}</span>
            </p>
          </div>

          <!-- Voters List -->
          <div v-if="voters.length > 0" class="voters-section">
            <h3 class="voters-title text-xl mb-4">Voters</h3>
            <div class="voters-list">
              <div
                v-for="voter in voters"
                :key="voter.id"
                class="voter-card hover:bg-gray-50"
              >
                <button 
                  @click="toggleVoterDetails(voter)"
                  class="voter-button py-4"
                >
                  <div class="voter-button-content">
                    <span class="voter-name text-lg">{{ voter.displayName }}</span>
                    <svg 
                      class="w-[25px] h-[25px] text-gray-400 transition-transform duration-200"
                      :class="{ 'transform rotate-90': selectedVoterId === voter.id }"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                <!-- Voter Details -->
                <div 
                  v-if="selectedVoterId === voter.id"
                  class="voter-details bg-gray-50 border-t border-gray-200"
                >
                  <div 
                    v-for="vote in voter.votes" 
                    :key="vote.countryId"
                    class="vote-item hover:bg-white"
                  >
                    <div class="country-info">
                      <span class="country-flag text-xl" role="img">
                        {{ getCountryFlag(vote.countryId) }}
                      </span>
                      <span class="country-name font-medium">{{ vote.countryId }}</span>
                    </div>
                    <span class="points-badge bg-blue-50 text-blue-600">
                      {{ vote.points }} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="leaderboard-grid">
          <template v-for="(country, index) in sortedResults" :key="country.name">
            <div class="country-row">
              <div class="rank-box">{{ index + 1 }}</div>
              <div class="flag">{{ getCountryFlag(country.name) }}</div>
              <div class="country-name">{{ country.name }}</div>
              <div class="points">{{ country.totalPoints }}</div>
            </div>
          </template>
        </div>

        <!-- No Results Message -->
        <div v-if="sortedResults.length === 0" class="text-center py-8">
          <p class="text-gray-600">No results available yet</p>
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
              class="primary-button"
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
import { collection, onSnapshot, query, orderBy, getDocs, where, doc, getDoc, Timestamp } from 'firebase/firestore';
import { useVoting } from '../composables/useVoting';
import { useAuth } from '../composables/useAuth';
import { getCountryFlag } from '../utils/countryFlags';
import { useRouter } from 'vue-router';
import { runTransaction } from 'firebase/firestore';

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
const router = useRouter();

const showDeleteUsersModal = ref(false);
const isDeletingUsers = ref(false);
const isResetting = ref(false);
const showResetModal = ref(false);

const voters = ref([]);

const isGoogleUser = computed(() => user.value?.type === 'google');
const isAdmin = computed(() => user.value?.email === 'dprybysh@gmail.com');

const selectedVoterId = ref(null);

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
const totalVotes = ref(0);

const loadResults = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Set up real-time listener for votes
    const votesQuery = query(collection(db, 'votes'));
    const unsubscribeVotes = onSnapshot(votesQuery, async (votesSnapshot) => {
      // Recalculate points for each country
      const pointsMap = new Map();
      
      // Process all votes
      votesSnapshot.docs.forEach(voteDoc => {
        const voteData = voteDoc.data();
        voteData.votes.forEach(vote => {
          const currentPoints = pointsMap.get(vote.countryId) || 0;
          pointsMap.set(vote.countryId, currentPoints + vote.points);
        });
      });
      
      // Update results with new point totals
      const resultsQuery = query(collection(db, 'results'));
      const resultsSnapshot = await getDocs(resultsQuery);
      
      results.value = resultsSnapshot.docs.map(doc => ({
        name: doc.id,
        totalPoints: pointsMap.get(doc.id) || 0
      }));
      
      isLoading.value = false;
    }, (err) => {
      console.error('Error in vote updates:', err);
      error.value = 'Failed to get vote updates';
      isLoading.value = false;
    });

  } catch (err) {
    console.error('Error loading results:', err);
    error.value = 'Failed to load leaderboard';
  } finally {
    isLoading.value = false;
  }
};

const handleReset = () => {
  showResetModal.value = true;
};

const formatVoteTime = (timestamp) => {
  if (!timestamp) return '';
  
  let date;
  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (timestamp.seconds) {
    // Handle Firestore timestamp object
    date = new Date(timestamp.seconds * 1000);
  } else {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

// Add getUserVoteHistory function
const getUserVoteHistory = async (voter) => {
  try {
    // Get the vote document
    const voteRef = doc(db, 'votes', voter.id);
    const voteDoc = await getDoc(voteRef);
    
    if (!voteDoc.exists()) {
      return null;
    }

    const voteData = voteDoc.data();
    
    // Map the votes to include country names
    const votesWithNames = voteData.votes.map(vote => ({
      countryId: vote.countryId,
      countryName: vote.countryId, // Since countryId is the country name
      points: vote.points
    }));

    return {
      userDisplayName: voter.displayName,
      timestamp: voteData.timestamp,
      votes: votesWithNames
    };
  } catch (err) {
    console.error('Error fetching vote history:', err);
    throw new Error('Failed to fetch vote history');
  }
};

// Update showVoterDetails to use voter object directly
const showVoterDetails = async (voter) => {
  try {
    const voteHistory = await getUserVoteHistory(voter);
    if (voteHistory) {
      selectedVoter.value = {
        ...voteHistory,
        votes: voteHistory.votes.sort((a, b) => b.points - a.points)
      };
    } else {
      selectedVoter.value = null;
      error.value = 'No voting history found for this user';
    }
  } catch (err) {
    console.error('Error fetching voter details:', err);
    error.value = 'Failed to load voter details';
    selectedVoter.value = null;
  }
};

// Close modal
const closeModal = () => {
  selectedVoter.value = null;
};

// Load votes and voters
const loadVoters = async () => {
  try {
    const votersList = [];
    const uniqueVoters = new Map(); // Track unique voters by userId
    
    const votesSnapshot = await getDocs(collection(db, 'votes'));
    
    for (const voteDoc of votesSnapshot.docs) {
      const voteData = voteDoc.data();
      const userId = voteData.userId;

      if (!userId) continue;

      try {
        let voterName = '';
        let isGuest = false;

        if (userId.startsWith('name_')) {
          voterName = userId.replace('name_', '');
          isGuest = true;
        } else if (voteData.userType === 'google') {
          const userRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            voterName = userDoc.data().displayName;
            isGuest = false;
          } else {
            console.error('Google user document not found:', userId);
          }
        } else {
          const guestRef = doc(db, 'guestUsers', userId);
          const guestDoc = await getDoc(guestRef);
          if (guestDoc.exists()) {
            voterName = guestDoc.data().displayName;
            isGuest = true;
          }
        }

        if (voterName) {
          const voterData = {
            id: voteDoc.id,
            displayName: voterName,
            isGuest,
            timestamp: voteData.timestamp,
            votes: voteData.votes,
            userId: userId
          };
          
          // Only keep the most recent vote for each user
          const existingVoter = uniqueVoters.get(userId);
          if (!existingVoter || 
              (existingVoter.timestamp && 
               voterData.timestamp && 
               voterData.timestamp.seconds > existingVoter.timestamp.seconds)) {
            uniqueVoters.set(userId, voterData);
          }
        }
      } catch (err) {
        console.error(`Error fetching user ${userId}:`, err);
      }
    }

    // Convert unique voters map to array
    votersList.push(...uniqueVoters.values());

    // Sort voters by timestamp, most recent first
    voters.value = votersList.sort((a, b) => {
      if (!a.timestamp || !b.timestamp) return 0;
      return b.timestamp.seconds - a.timestamp.seconds;
    });

    // Update total votes count
    totalVotes.value = uniqueVoters.size;
  } catch (err) {
    console.error('Error loading voters:', err);
    error.value = 'Failed to load voters list';
  }
};

const deleteAllUsers = async () => {
  try {
    isDeletingUsers.value = true;
    
    // Delete all users and their votes
    await runTransaction(db, async (transaction) => {
      // Get all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const guestUsersSnapshot = await getDocs(collection(db, 'guestUsers'));
      const votesSnapshot = await getDocs(collection(db, 'votes'));

      // Delete all users
      usersSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });

      // Delete all guest users
      guestUsersSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });

      // Delete all votes
      votesSnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });
    });

    showDeleteUsersModal.value = false;
    // Show success message or redirect
    router.push('/');
  } catch (err) {
    console.error('Error deleting users:', err);
    error.value = 'Failed to delete users';
  } finally {
    isDeletingUsers.value = false;
  }
};

const toggleVoterDetails = (voter) => {
  selectedVoterId.value = selectedVoterId.value === voter.id ? null : voter.id;
};

onMounted(() => {
  loadResults();
  loadVoters();
});

onUnmounted(() => {
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

<style scoped>
.admin-danger-button {
  background-color: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  width: 100%;
  max-width: 300px;
  margin: 20px 0;
}

.admin-danger-button:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

.admin-danger-button:disabled {
  background-color: #fca5a5;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #ef4444;
  background-color: #fee2e2;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  text-align: center;
}

.voters-section {
  margin: 2rem 0;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.voters-title {
  font-weight: 600;
  color: var(--color-gray-700);
  padding-left: 1rem;
}

.voters-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.voter-button-content svg {
  margin-right: 0.5rem;
  width: 25px;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.voter-card {
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  transition: all 0.3s ease;
}

.voter-button {
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--color-gray-700);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.voter-button-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.voter-name {
  font-size: 1rem;
  color: var(--color-gray-700);
}

.voter-button:hover {
  background: var(--color-gray-100);
}

.voter-details {
  border-top: 1px solid var(--color-gray-200);
  padding: 0.75rem;
  background: var(--color-gray-50);
}

.vote-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: transparent;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.vote-item:last-child {
  margin-bottom: 0;
}

.country-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.country-flag {
  font-size: 1.25rem;
}

.country-name {
  font-size: 0.875rem;
  color: var(--color-gray-700);
}

.points-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

@media (max-width: 640px) {
  .voters-list {
    width: 100%;
  }
}

.leaderboard-container {
  background: linear-gradient(135deg, #090979, #1b1b94, #4b0082);
  position: relative;
  color: white;
  padding: 30px;
  text-align: center;
  min-height: 100vh;
  overflow: hidden;
}

.eurovision-title {
  color: #0e0e80;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: none;
}

.leaderboard-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.country-row {
  display: grid;
  grid-template-columns: 60px 60px 1fr 100px;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: #0e0e80;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
	margin-bottom: 0.5rem;
}

.rank-box {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--eurovision-rank-bg);
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.2rem;
}

.flag {
  font-size: 1.5rem;
}

.country-name {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.points {
  font-weight: bold;
  font-size: 1.2rem;
  text-align: right;
}

.votes-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  color: white;
  max-width: 800px;
  margin: 2rem auto;
}

.loading-state,
.error-state {
  color: white;
  text-align: center;
}

/* Adding vertical light streaks */
.leaderboard-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 5%,
    rgba(255, 255, 255, 0) 10%
  );
  opacity: 0.5;
  animation: moveLights 5s linear infinite;
}

/* Light animation effect */
@keyframes moveLights {
  0% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(10%);
  }
}

.content-container {
  position: relative; /* Add this to keep content above the light effect */
  z-index: 1;        /* Ensure content stays above the animated background */
}
</style> 