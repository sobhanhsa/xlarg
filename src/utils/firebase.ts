// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "xlarg-417209.firebaseapp.com",
  projectId: "xlarg-417209",
  storageBucket: "xlarg-417209.appspot.com",
  messagingSenderId: "197452823797",
  appId: "1:197452823797:web:af01b3319dc4470d8bd9bc",
  measurementId: "G-Z0D4XW58V0"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
