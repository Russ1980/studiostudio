
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required Firebase config keys are present
const areEnvsLoaded = 
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId;

let app;

if (areEnvsLoaded) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} else {
    console.error("Firebase environment variables are not loaded. Please check your .env.local file.");
    // In a non-functional state, we can assign a placeholder object to `app` to avoid further crashes.
    // However, any Firebase call will fail.
    app = {}; 
}

export { app };
