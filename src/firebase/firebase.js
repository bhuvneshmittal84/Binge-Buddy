import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHD1qbLhEVrpTzl0VJvUMQM5RXJoomRSg",
  authDomain: "bingebuddy-844ba.firebaseapp.com",
  projectId: "bingebuddy-844ba",
  storageBucket: "bingebuddy-844ba.firebasestorage.app",
  messagingSenderId: "223433085999",
  appId: "1:223433085999:web:22e220e917e8d6437ce2da",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
