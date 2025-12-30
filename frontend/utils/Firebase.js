import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginlms-57609.firebaseapp.com",
  projectId: "loginlms-57609",
  storageBucket: "loginlms-57609.firebasestorage.app",
  messagingSenderId: "1029578414764",
  appId: "1:1029578414764:web:5a46fb13ef6ae1974d9d09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}

 