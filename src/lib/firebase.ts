// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIF2gOQYIq3kmrAp04Yk19xZzqPH0gOgc",
  authDomain: "posyandu-view.firebaseapp.com",
  projectId: "posyandu-view",
  storageBucket: "posyandu-view.firebasestorage.app",
  messagingSenderId: "238722164643",
  appId: "1:238722164643:web:8605fce7061ce4b137dc16",
  measurementId: "G-BKYRRZBSXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
