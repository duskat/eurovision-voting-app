import { ref, onMounted } from 'vue';
import { auth, db } from '../firebase/config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  limit,
  runTransaction,
} from 'firebase/firestore';

const user = ref(null);
const guestUser = ref(null);
const error = ref(null);
const isLoading = ref(true);
let authInitialized = false;

// Initialize auth state listener
const initializeAuth = () => {
  if (authInitialized) return;

  isLoading.value = true;
  authInitialized = true;

  // Set persistence to LOCAL
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error('Error setting persistence:', err);
  });

  const unsubscribe = onAuthStateChanged(
    auth,
    async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        // Clear guest user when Firebase user is detected
        if (guestUser.value) {
          localStorage.removeItem('guestUser');
          guestUser.value = null;
        }
      } else {
        user.value = null;
        // Check for guest user in localStorage
        const savedGuestUser = localStorage.getItem('guestUser');
        if (savedGuestUser) {
          guestUser.value = JSON.parse(savedGuestUser);
        }
      }
      isLoading.value = false;
    },
    (err) => {
      console.error('Auth state error:', err);
      error.value = err.message;
      isLoading.value = false;
    }
  );

  return unsubscribe;
};

const checkUsernameAvailability = async (username) => {
  if (!username) return false;

  try {
    // Normalize the username (trim and lowercase)
    const normalizedUsername = username.trim().toLowerCase();

    // Check guest users collection
    const guestQuery = query(
      collection(db, 'guestUsers'),
      where('normalizedUsername', '==', normalizedUsername),
      limit(1)
    );
    const guestSnapshot = await getDocs(guestQuery);

    if (!guestSnapshot.empty) {
      return false;
    }

    // Check regular users collection
    const userQuery = query(
      collection(db, 'users'),
      where('normalizedUsername', '==', normalizedUsername),
      limit(1)
    );
    const userSnapshot = await getDocs(userQuery);

    return userSnapshot.empty;
  } catch (err) {
    console.error('Error checking username availability:', err);
    throw new Error('Unable to check username availability. Please try again.');
  }
};

const signInWithName = async (displayName) => {
  isLoading.value = true;
  error.value = null;

  try {
    // Basic validation
    const trimmedName = displayName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      throw new Error('Username must be at least 2 characters long');
    }

    // Normalize username and create guest data first
    const guestId = `guest_${Date.now()}`;
    const normalizedUsername = trimmedName.toLowerCase();

    // Create guest data object
    const guestData = {
      uid: guestId,
      displayName: trimmedName,
      normalizedUsername,
      isGuest: true,
      createdAt: new Date(),
    };

    // First check if username exists without transaction
    const [existingUsers, existingGuests] = await Promise.all([
      getDocs(
        query(
          collection(db, 'users'),
          where('normalizedUsername', '==', normalizedUsername),
          limit(1)
        )
      ),
      getDocs(
        query(
          collection(db, 'guestUsers'),
          where('normalizedUsername', '==', normalizedUsername),
          limit(1)
        )
      ),
    ]);

    // Log for debugging
    console.log('Checking username:', {
      normalizedUsername,
      existingUsers: existingUsers.size,
      existingGuests: existingGuests.size,
    });

    if (!existingUsers.empty || !existingGuests.empty) {
      throw new Error(
        'This username is already taken. Please choose another one.'
      );
    }

    // If username is available, create the guest user
    const guestRef = doc(db, 'guestUsers', guestId);
    await setDoc(guestRef, guestData);

    // Update local state
    localStorage.setItem('guestUser', JSON.stringify(guestData));
    user.value = guestData;
    guestUser.value = guestData;
  } catch (err) {
    console.error('Guest sign in error:', err);
    error.value = err.message || 'Failed to sign in as guest';
    throw err;
  } finally {
    isLoading.value = false;
  }
};

const signInWithGoogle = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Create or update user document
    await setDoc(doc(db, 'users', result.user.uid), {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      lastLogin: new Date(),
    });

    user.value = result.user;
  } catch (err) {
    console.error('Google sign in error:', err);
    error.value = 'Failed to sign in with Google';
  } finally {
    isLoading.value = false;
  }
};

// Move logout inside useAuth to access router
export function useAuth(router) {
  const logout = async () => {
    try {
      const savedGuestUser = localStorage.getItem('guestUser');
      if (savedGuestUser) {
        localStorage.removeItem('guestUser');
        guestUser.value = null; // Clear guest user
      } else {
        await firebaseSignOut(auth);
      }
      user.value = null; // Clear user

      if (router) {
        router.push('/');
      }
      return true;
    } catch (err) {
      console.error('Sign out error:', err);
      throw new Error('Failed to sign out');
    }
  };

  // Initialize auth state on component mount
  onMounted(() => {
    const unsubscribe = initializeAuth();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  return {
    user,
    guestUser,
    error,
    isLoading,
    signInWithGoogle,
    signInWithName,
    logout,
    initializeAuth, // Export this so we can use it in router
  };
}
