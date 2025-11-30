import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ------------------------------------------------------------------
// FIREBASE CONFIGURATION
// Project ID found from your screenshot: axionym-guard
// ------------------------------------------------------------------
const firebaseConfig = {
  // You MUST replace this with your actual API Key from Firebase Console
  apiKey: "YOUR_API_KEY_HERE",
  
  // This is the project ID from your screenshot
  projectId: "axionym-guard",
  
  // Standard Firebase defaults based on project ID
  authDomain: "axionym-guard.firebaseapp.com",
  storageBucket: "axionym-guard.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Optional for Firestore
  appId: "YOUR_APP_ID" // Optional for Firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);