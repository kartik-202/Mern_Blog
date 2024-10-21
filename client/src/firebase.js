// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d9869.firebaseapp.com",
  projectId: "mern-blog-d9869",
  storageBucket: "mern-blog-d9869.appspot.com",
  messagingSenderId: "961055657056",
  appId: "1:961055657056:web:ef294a57f95c3741ffc705"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);