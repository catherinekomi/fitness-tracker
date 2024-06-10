import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBchgy-rPzk0FgnMDc4ldPdiREztaeoTRo',
  authDomain: 'fitness-tracker-a2a2b.firebaseapp.com',
  projectId: 'fitness-tracker-a2a2b',
  storageBucket: 'fitness-tracker-a2a2b.appspot.com',
  messagingSenderId: '662062597103',
  appId: '1:662062597103:web:5a2f8da78cf3eb2cc12c1a',
  measurementId: 'G-XJFE1S0791',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
