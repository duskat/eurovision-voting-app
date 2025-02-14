import { ref, onMounted } from 'vue';
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
} from 'firebase/firestore';

const countries = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentVote = ref(null);

const selectedVotes = ref({
  first: '',
  second: '',
  third: '',
});

const loadCountries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'results'));
    countries.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.id,
      totalPoints: doc.data().totalPoints,
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
  // Check if user has already voted
  const checkExistingVote = async () => {
    try {
      const currentUser = auth.currentUser;
      const guestUser = JSON.parse(localStorage.getItem('guestUser'));
      const userId = currentUser?.uid || guestUser?.uid;

      if (!userId) return null;

      const votesQuery = query(
        collection(db, 'votes'),
        where('userId', '==', userId)
      );

      const snapshot = await getDocs(votesQuery);
      if (!snapshot.empty) {
        const voteDoc = snapshot.docs[0];
        currentVote.value = {
          id: voteDoc.id,
          ...voteDoc.data(),
        };
        return currentVote.value;
      }
      return null;
    } catch (err) {
      console.error('Error checking existing vote:', err);
      error.value = 'Failed to check existing vote';
      return null;
    }
  };

  // Submit or update votes
  const submitVotes = async (selectedCountries) => {
    try {
      const currentUser = auth.currentUser;
      const guestUser = JSON.parse(localStorage.getItem('guestUser'));
      const userId = currentUser?.uid || guestUser?.uid;
      const userDisplayName =
        currentUser?.displayName || guestUser?.displayName;

      if (!userId) {
        throw new Error('No user authenticated');
      }

      const newVotes = selectedCountries.map((country, index) => ({
        countryId: country.id,
        countryName: country.name,
        points: index === 0 ? 12 : index === 1 ? 10 : 8,
      }));

      await runTransaction(db, async (transaction) => {
        // Get all affected documents
        const resultDocs = new Map();
        const affectedCountries = new Set();

        // Add countries from new votes
        newVotes.forEach((vote) => affectedCountries.add(vote.countryId));

        // Get existing vote if any
        let existingVoteDoc = null;
        if (currentVote.value?.id) {
          const voteRef = doc(db, 'votes', currentVote.value.id);
          existingVoteDoc = await transaction.get(voteRef);

          // Add countries from existing vote
          if (existingVoteDoc.exists()) {
            existingVoteDoc
              .data()
              .votes.forEach((vote) => affectedCountries.add(vote.countryId));
          }
        }

        // Get all affected result documents
        for (const countryId of affectedCountries) {
          const resultRef = doc(db, 'results', countryId);
          resultDocs.set(countryId, await transaction.get(resultRef));
        }

        // Update points
        const pointsUpdate = new Map();

        // Remove old points if updating
        if (existingVoteDoc?.exists()) {
          existingVoteDoc.data().votes.forEach((vote) => {
            const current = pointsUpdate.get(vote.countryId) || 0;
            pointsUpdate.set(vote.countryId, current - vote.points);
          });
        }

        // Add new points
        newVotes.forEach((vote) => {
          const current = pointsUpdate.get(vote.countryId) || 0;
          pointsUpdate.set(vote.countryId, current + vote.points);
        });

        // Apply updates
        // Delete old vote if exists
        if (existingVoteDoc?.exists()) {
          transaction.delete(existingVoteDoc.ref);
        }

        // Create new vote with user info
        const newVoteRef = doc(collection(db, 'votes'));
        const voteData = {
          votes: newVotes,
          userId,
          userDisplayName,
          timestamp: serverTimestamp(),
          lastModified: serverTimestamp(),
        };
        transaction.set(newVoteRef, voteData);

        // Update results
        for (const [countryId, pointChange] of pointsUpdate) {
          const resultDoc = resultDocs.get(countryId);
          if (resultDoc?.exists()) {
            const currentPoints = resultDoc.data().totalPoints || 0;
            transaction.update(resultDoc.ref, {
              totalPoints: Math.max(0, currentPoints + pointChange),
            });
          }
        }

        // Update local reference
        currentVote.value = {
          id: newVoteRef.id,
          ...voteData,
        };
      });

      return true;
    } catch (err) {
      console.error('Error submitting votes:', err);
      throw new Error('Failed to submit votes');
    }
  };

  // Add function to get user's vote history
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

  // Clear current vote (for testing/development)
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
  };
}
