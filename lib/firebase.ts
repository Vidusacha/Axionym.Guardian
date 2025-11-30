import { initializeApp } from 'firebase/app';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// ------------------------------------------------------------------
// FIREBASE CONFIGURATION
// Project ID: axionym-guard
// ------------------------------------------------------------------
const firebaseConfig = {
  // You MUST replace this with your actual API Key from Firebase Console
  // Settings -> General -> Your apps -> SDK Setup and Configuration
  apiKey: "YOUR_API_KEY_HERE",
  
  projectId: "axionym-guard",
  
  // Standard Firebase defaults based on project ID
  authDomain: "axionym-guard.firebaseapp.com",
  storageBucket: "axionym-guard.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore with Memory Cache (Persistence Disabled)
// This prevents issues with localhost environments hanging or syncing conflicts
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
});

// Helper to ensure user is logged in before DB operations
export const ensureAuth = async () => {
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
      console.log("[Auth] Signed in anonymously");
    }
  } catch (error) {
    console.error("[Auth] Sign in failed", error);
    // Continue anyway; DB calls might fail but app won't crash
  }
};