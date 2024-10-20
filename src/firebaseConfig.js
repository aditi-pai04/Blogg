// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyAQGn_hewuQ2hMn_ZLSwsiwxuphdsYlRRY",
  authDomain: "blogg-32b9e.firebaseapp.com",
  projectId: "blogg-32b9e",
  storageBucket: "blogg-32b9e.appspot.com",
  messagingSenderId: "408865295266",
  appId: "1:408865295266:web:8c3d92e7f00f7e4b8100fb",
  measurementId: "G-KWDPYHM2WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export const storage = getStorage(app); 
