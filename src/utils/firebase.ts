// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "medium-blog-app.firebaseapp.com",
  projectId: "medium-blog-app",
  storageBucket: "medium-blog-app.appspot.com",
  messagingSenderId: "22535067998",
  appId: "1:22535067998:web:d06194ca2b5baca77997cf",
  measurementId: "G-VZYR0S1E5Z"
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBaseApp);