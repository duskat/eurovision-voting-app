import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: 'AIzaSyAcA-g50NVo-sgCQStBhDWZyMJuVYucpyQ',
  authDomain: 'eurovisionvotingapp-bfa92.firebaseapp.com',
  projectId: 'eurovisionvotingapp-bfa92',
  storageBucket: 'eurovisionvotingapp-bfa92.firebasestorage.app',
  messagingSenderId: '951848335066',
  appId: '1:951848335066:web:450ca4a90dd21a9f3997e3',
  measurementId: 'G-TQGCLLGPQJ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
