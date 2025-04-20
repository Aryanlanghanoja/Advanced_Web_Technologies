// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.DB_APIKEY,
  authDomain:  process.env.DB_AUTHDOMAIN,
  projectId:process.env.DB_PROJECTID,
  storageBucket: process.env.DB_STORAGEBUCKET,
  messagingSenderId: process.env.DB_MESSAGINGSENDERID,
  appId: process.env.DB_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const book = collection(db, "books");

// Error handling for Firebase connection
try {
  if (!app || !db || !book) {
    throw new Error('Firebase connection failed');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Re-throw to be handled by calling code
  throw error;
}

export { db , book };




