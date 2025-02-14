import { db } from './config';
import { doc, setDoc } from 'firebase/firestore';

const initialCountries = [
  'Sweden',
  'Finland',
  'Israel',
  'Norway',
  'Italy',
  'France',
  'Spain',
  'Ukraine',
  'Croatia',
  'Moldova',
];

export async function initializeCountries() {
  try {
    for (const country of initialCountries) {
      await setDoc(doc(db, 'results', country), {
        totalPoints: 0,
      });
    }
    console.log('Countries initialized successfully');
  } catch (error) {
    console.error('Error initializing countries:', error);
  }
}
