import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for project 'railx-48e91'
export const firebaseConfig = {
  projectId: "railx-48e91",
  appId: "1:262895001272:web:c2be60c87cdb4ad9a85e4d",
  storageBucket: "railx-48e91.firebasestorage.app",
  apiKey: "AIzaSyDkr3ceKrDFEthcsF4oPB9vpIXdmVrrwHM",
  authDomain: "railx-48e91.firebaseapp.com",
  messagingSenderId: "262895001272",
  measurementId: "G-Z20M9L24F5"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
