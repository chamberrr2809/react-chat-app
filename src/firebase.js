import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDi34cep-XVkqe2SWt8Os2eYDs3tIbqEJE',
  authDomain: 'mychat-backend.firebaseapp.com',
  projectId: 'mychat-backend',
  storageBucket: 'mychat-backend.appspot.com',
  messagingSenderId: '424137266241',
  appId: '1:424137266241:web:995c82ac93c2806696e2c0',
  measurementId: 'G-LBKT8TNQ9R',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default auth;
export { db };
