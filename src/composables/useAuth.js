import { ref, onMounted, computed, watch } from 'vue';
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
  serverTimestamp,
} from 'firebase/firestore';

const SESSION_KEY = 'eurovision_session';
const user = ref(null);
const guestUser = ref(null);
const error = ref(null);
const isLoading = ref(true);
const isAuthenticated = ref(false);
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

const signInWithName = async (name) => {
  try {
    isLoading.value = true;
    error.value = null;

    const userId = `name_${name}`;

    // Create a guest user document
    const guestRef = doc(db, 'guestUsers', userId);
    await setDoc(guestRef, {
      displayName: name,
      createdAt: serverTimestamp(),
    });

    // Set the guest user in state
    guestUser.value = {
      id: userId,
      displayName: name,
    };

    // Store in localStorage
    localStorage.setItem(
      'guestUser',
      JSON.stringify({
        id: userId,
        displayName: name,
      })
    );

    return guestUser.value;
  } catch (err) {
    console.error('Error signing in with name:', err);
    error.value = 'Failed to sign in. Please try again.';
    throw err;
  } finally {
    isLoading.value = false;
  }
};

export function useAuth(router) {
  // Add session persistence
  const saveSession = (userData) => {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        ...userData,
        timestamp: Date.now(),
      })
    );
  };

  const clearSession = () => {
    // Clear all auth-related storage
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('user');
    localStorage.removeItem('guestUser');
    localStorage.removeItem('eurovision_votes');

    // Only clear Firebase persistence if we have a Google user
    if (auth.currentUser) {
      auth
        .setPersistence(auth.Auth.Persistence.NONE)
        .catch((err) => console.error('Error clearing auth persistence:', err));
    }

    // Reset all reactive refs
    user.value = null;
    guestUser.value = null;
    error.value = null;
  };

  // Move signInWithGoogle inside useAuth
  const signInWithGoogle = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const { user: firebaseUser } = result;

      // Create or update user document
      const userRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(
        userRef,
        {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      // Set user state
      user.value = {
        uid: firebaseUser.uid,
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        picture: firebaseUser.photoURL,
        type: 'google',
      };

      return user.value;
    } catch (err) {
      console.error('Error signing in with Google:', err);
      error.value = 'Failed to sign in with Google. Please try again.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Update login function
  const login = async (response) => {
    try {
      const credential = GoogleAuthProvider.credentialFromResult(response);
      if (!credential) throw new Error('No credential received');

      const userData = {
        uid: response.user.uid,
        email: response.user.email,
        displayName: response.user.displayName,
        type: 'google',
      };

      // Save to Firestore
      await setDoc(doc(db, 'users', response.user.uid), userData);

      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (err) {
      console.error('Login error:', err);
      error.value = err.message;
      throw err;
    }
  };

  // Update logout function to handle both Google and guest users
  const logout = async () => {
    try {
      isLoading.value = true;

      // Handle Google user logout
      if (user.value && auth.currentUser) {
        await firebaseSignOut(auth);
      }

      // Handle guest user logout
      if (guestUser.value) {
        localStorage.removeItem('guestUser');
        guestUser.value = null;
      }

      // Clear all storage
      localStorage.removeItem('eurovision_votes');
      sessionStorage.removeItem(SESSION_KEY);

      // Reset all reactive refs
      user.value = null;
      guestUser.value = null;
      error.value = null;

      // Clear session
      clearSession();

      // Force page reload to clear any remaining state
      if (router) {
        await router.push('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // Initialize auth state on component mount
  onMounted(() => {
    const unsubscribe = initializeAuth();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }

    // Listen for auth state changes
    auth.onAuthStateChanged((firebaseUser) => {
      isLoading.value = false;
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          type: 'google',
        };
        user.value = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        user.value = null;
        localStorage.removeItem('user');
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  const isLoggedIn = computed(() => !!user.value || !!guestUser.value);
  const userName = computed(() => {
    if (user.value?.displayName) return user.value.displayName;
    if (user.value?.name) return user.value.name;
    if (guestUser.value?.name) return guestUser.value.name;
    return '';
  });
  const userType = computed(() => {
    if (user.value) return 'google';
    if (guestUser.value) return 'guest';
    return null;
  });

  const getUserId = computed(() => {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    }
    if (guestUser.value) {
      return guestUser.value.id;
    }
    return null;
  });

  // Initialize auth state
  const initAuth = () => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const userData = JSON.parse(session);
        // Check session age (expire after 24 hours)
        const sessionAge = Date.now() - userData.timestamp;
        if (sessionAge > 24 * 60 * 60 * 1000) {
          clearSession();
          return;
        }

        if (userData.type === 'google') {
          if (!auth.currentUser) {
            clearSession();
            return;
          }
          user.value = userData;
        } else if (userData.type === 'guest') {
          guestUser.value = userData;
        }

        // Restore last route if exists
        const lastRoute = localStorage.getItem('intendedRoute');
        if (lastRoute) {
          router.push(lastRoute);
          localStorage.removeItem('intendedRoute');
        }
      } catch (error) {
        console.error('Error parsing session:', error);
        clearSession();
      }
    }
  };

  // Watch for route changes to check auth
  if (router) {
    watch(
      () => router.currentRoute.value,
      (route) => {
        // Only protect /vote and /leaderboard routes
        const protectedRoutes = ['/vote', '/leaderboard'];
        if (protectedRoutes.includes(route.path) && !isLoggedIn.value) {
          router.push('/');
        }
      }
    );
  }

  // Initialize on creation
  initAuth();

  const checkAuthState = async () => {
    if (isLoading.value) {
      try {
        // Check if user is logged in (e.g., check localStorage, session, or token)
        const token = localStorage.getItem('auth_token');
        isAuthenticated.value = !!token;
      } catch (error) {
        console.error('Error checking auth state:', error);
        isAuthenticated.value = false;
      } finally {
        isLoading.value = false;
      }
    }
  };

  return {
    user,
    guestUser,
    error,
    isLoading,
    signInWithGoogle,
    signInWithName,
    logout,
    initializeAuth,
    isLoggedIn,
    userName,
    userType,
    login,
    initAuth,
    getUserId,
    isAuthenticated,
    checkAuthState,
  };
}
