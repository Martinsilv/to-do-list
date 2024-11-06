// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD8pKd-c5PCFUQQm_nsHULMXIwUFt6QtU",
  authDomain: "to-do-list-51d43.firebaseapp.com",
  projectId: "to-do-list-51d43",
  storageBucket: "to-do-list-51d43.appspot.com",
  messagingSenderId: "398518598048",
  appId: "1:398518598048:web:d7c10ffdc26aa0ca55ccc5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)