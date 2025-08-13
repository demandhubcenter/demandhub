
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "demandhub-odwwp",
  appId: "1:114224833753:web:cdcc7c548c9de94a164ac8",
  storageBucket: "demandhub-odwwp.firebasestorage.app",
  apiKey: "AIzaSyClZm_miFzJrKZqz9F4F9FNLSoPBhw-gO0",
  authDomain: "demandhub-odwwp.firebaseapp.com",
  messagingSenderId: "114224833753",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
