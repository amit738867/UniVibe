import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "campus-connect-sbzn2",
  appId: "1:1001663898745:web:41e47ba48dbbb14d9420a8",
  storageBucket: "campus-connect-sbzn2.firebasestorage.app",
  apiKey: "AIzaSyCwzSSP-9WoWgwTWcJGzJ5PhK31BdQM74c",
  authDomain: "campus-connect-sbzn2.firebaseapp.com",
  messagingSenderId: "1001663898745"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
