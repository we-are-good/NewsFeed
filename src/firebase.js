// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdTFPU30-TU4LcjbvOygxbFF6HDUw-1-0",
  authDomain: "groove-3e149.firebaseapp.com",
  projectId: "groove-3e149",
  storageBucket: "groove-3e149.appspot.com",
  messagingSenderId: "793519418904",
  appId: "1:793519418904:web:0979996e5ef9f3fb0b9d6d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
