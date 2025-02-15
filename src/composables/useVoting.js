import { ref, onMounted, computed } from 'vue';
import { db, auth } from '../firebase/config';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  runTransaction,
  writeBatch,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  deleteDoc,
} from 'firebase/firestore';
import { useAuth } from './useAuth';

const VOTES_STORAGE_KEY = 'eurovision_votes';

const countries = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentVote = ref(null);

const selectedVotes = ref({
  first: '',
  second: '',
  third: '',
});

const { user, guestUser } = useAuth();

const getUserId = computed(() => {
  if (user.value?.type === 'google') {
    // For Google users, ensure we have the uid
    if (!user.value.uid) {
      console.error('No UID found for Google user:', user.value);
      return null;
    }
    return user.value.uid;
  }
  // For guest users, check both guestUser and user
  if (guestUser.value?.id) {
    return guestUser.value.id;
  }
  return null;
});

const hasVoted = computed(() => {
  if (!getUserId.value) return false;
  const storedVotes = localStorage.getItem(VOTES_STORAGE_KEY);
  if (!storedVotes) return false;

  const votes = JSON.parse(storedVotes);
  return !!votes[getUserId.value];
});

const canUpdateVote = computed(() => {
  // Allow both Google and guest users to update their votes
  return !!getUserId.value;
});

const loadCountries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'results'));
    countries.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.id,
      totalPoints: doc.data().totalPoints || 0,
    }));
    error.value = null;
  } catch (err) {
    console.error('Error loading countries:', err);
    error.value = 'Failed to load countries';
  } finally {
    isLoading.value = false;
  }
};

export function useVoting() {
  const checkExistingVote = async () => {
    if (!getUserId.value) return null;

    try {
      // Check for existing vote in Firestore for all users
      const voteRef = doc(db, 'votes', getUserId.value);
      const voteDoc = await getDoc(voteRef);

      if (voteDoc.exists()) {
        return voteDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error checking existing vote:', error);
      return null;
    }
  };

  const submitVotes = async (selectedCountries) => {
    let currentUserId;

    if (user.value?.type === 'google') {
      if (user.value.uid) {
        currentUserId = user.value.uid;
      }
    } else if (guestUser.value) {
      currentUserId = `name_${guestUser.value.displayName}`;
    } else if (user.value?.uid) {
      currentUserId = user.value.uid;
    }

    if (!currentUserId) {
      console.error('No valid user ID found');
      throw new Error('Please sign in or enter your name to vote');
    }

    try {
      isLoading.value = true;

      await runTransaction(db, async (transaction) => {
        // Step 1: Perform all reads first
        const voteRef = doc(db, 'votes', currentUserId);
        const voteDoc = await transaction.get(voteRef);

        // Read all affected country documents
        const countryDocs = new Map();

        // Read existing vote's country docs
        if (voteDoc.exists()) {
          const oldVotes = voteDoc.data().votes;
          for (const vote of oldVotes) {
            const countryRef = doc(db, 'results', vote.countryId);
            const countryDoc = await transaction.get(countryRef);
            countryDocs.set(vote.countryId, {
              ref: countryRef,
              doc: countryDoc,
            });
          }
        }

        // Read new vote's country docs
        for (const country of selectedCountries) {
          if (country && !countryDocs.has(country.id)) {
            const countryRef = doc(db, 'results', country.id);
            const countryDoc = await transaction.get(countryRef);
            countryDocs.set(country.id, { ref: countryRef, doc: countryDoc });
          }
        }

        // Step 2: Calculate point changes
        const pointUpdates = new Map();

        // Remove old vote points
        if (voteDoc.exists()) {
          const oldVotes = voteDoc.data().votes;
          for (const vote of oldVotes) {
            pointUpdates.set(vote.countryId, -vote.points);
          }
        }

        // Add new vote points
        selectedCountries.forEach((country, index) => {
          const points = [12, 10, 8][index];
          const currentPoints = pointUpdates.get(country.id) || 0;
          pointUpdates.set(country.id, currentPoints + points);
        });

        // Step 3: Perform all writes
        // Update country points
        for (const [countryId, pointDiff] of pointUpdates.entries()) {
          const { ref: countryRef, doc: countryDoc } =
            countryDocs.get(countryId);
          const currentPoints = countryDoc.exists()
            ? countryDoc.data().totalPoints || 0
            : 0;
          const newPoints = Math.max(0, currentPoints + pointDiff);

          transaction.update(countryRef, { totalPoints: newPoints });
        }

        // Save the new vote
        const voteData = {
          userId: currentUserId,
          userType: user.value?.type === 'google' ? 'google' : 'guest',
          votes: selectedCountries.map((country, index) => ({
            countryId: country.id,
            points: [12, 10, 8][index],
          })),
          timestamp: serverTimestamp(),
        };

        transaction.set(voteRef, voteData);
        currentVote.value = voteData;
      });

      error.value = null;
    } catch (err) {
      console.error('Error submitting votes:', err);
      error.value = 'Failed to submit votes';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getUserVoteHistory = async (userId) => {
    try {
      const votesQuery = query(
        collection(db, 'votes'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const snapshot = await getDocs(votesQuery);
      if (!snapshot.empty) {
        const voteDoc = snapshot.docs[0];
        return {
          id: voteDoc.id,
          ...voteDoc.data(),
        };
      }
      return null;
    } catch (err) {
      console.error('Error getting vote history:', err);
      throw new Error('Failed to get vote history');
    }
  };

  const clearCurrentVote = () => {
    currentVote.value = null;
  };

  const resetAllResults = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      await runTransaction(db, async (transaction) => {
        const resultsSnapshot = await getDocs(collection(db, 'results'));

        resultsSnapshot.docs.forEach((doc) => {
          transaction.update(doc.ref, { totalPoints: 0 });
        });

        const votesSnapshot = await getDocs(collection(db, 'votes'));
        votesSnapshot.docs.forEach((doc) => {
          transaction.delete(doc.ref);
        });
      });

      console.log('All points have been reset successfully');
      return true;
    } catch (err) {
      console.error('Error resetting results:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const clearVotes = async () => {
    if (!getUserId.value) return;

    try {
      const voteRef = doc(db, 'votes', getUserId.value);
      await deleteDoc(voteRef);

      const storedVotes = localStorage.getItem(VOTES_STORAGE_KEY);
      if (storedVotes) {
        const votes = JSON.parse(storedVotes);
        delete votes[getUserId.value];
        localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
      }

      currentVote.value = null;
      await loadCountries();
    } catch (error) {
      console.error('Error clearing votes:', error);
      throw error;
    }
  };

  onMounted(() => {
    loadCountries();
    checkExistingVote();
  });

  return {
    countries,
    selectedVotes,
    submitVotes,
    loadCountries,
    isLoading,
    error,
    resetAllResults,
    currentVote,
    checkExistingVote,
    clearCurrentVote,
    getUserVoteHistory,
    hasVoted,
    canUpdateVote,
    clearVotes,
  };
}
