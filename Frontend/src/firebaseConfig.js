// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-iEZIYnj6WE6tfvChmn-3jne-iyi8wN4",
  authDomain: "task-manager-606c1.firebaseapp.com",
  projectId: "task-manager-606c1",
  storageBucket: "task-manager-606c1.appspot.com",
  messagingSenderId: "325044715087",
  appId: "1:325044715087:web:ba4b5ad3b2f94467e4f43a",
  measurementId: "G-F41K5ZX3J0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export {db};