// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_CLERK_FIREBASE_API_KE,
  authDomain: "subhodayaapp.firebaseapp.com",
  projectId: "subhodayaapp",
  storageBucket: "subhodayaapp.appspot.com",
  messagingSenderId: "404207022810",
  appId: "1:404207022810:web:44775a8703143a52c96be3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)