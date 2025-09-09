import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Check if all required environment variables are set
if (
  !firebaseConfig.projectId ||
  !firebaseConfig.appId ||
  !firebaseConfig.storageBucket ||
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.messagingSenderId
) {
  // If the config is not set, we check if the Firebase hosting scripts have already initialized the app
  if (getApps().length === 0) {
     if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Firebase config is not set and no app is initialized. Please make sure you have set the environment variables or included the Firebase init script.'
        );
      }
  }
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
