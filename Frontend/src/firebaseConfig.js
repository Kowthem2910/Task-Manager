// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzmX-vGJermiGdXprxfJxNG_fFjA8CQNw",
  authDomain: "taskify-cf1b2.firebaseapp.com",
  projectId: "taskify-cf1b2",
  storageBucket: "taskify-cf1b2.appspot.com",
  messagingSenderId: "853381935344",
  appId: "1:853381935344:web:c3e4122e976b0a97cb5235"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export {db};