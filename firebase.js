// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCobJsi0KTFM2cpcdBTFLHgc0UEkR1rxZo",
  authDomain: "task1-cd23e.firebaseapp.com",
  projectId: "task1-cd23e",
  storageBucket: "task1-cd23e.firebasestorage.app",
  messagingSenderId: "455930974067",
  appId: "1:455930974067:web:16be4749dbb803ef587f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);