// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYiW9uwc3IOFl2hSlxvEhE4oo_NZoewG4",
  authDomain: "task-manager-4097e.firebaseapp.com",
  projectId: "task-manager-4097e",
  storageBucket: "task-manager-4097e.appspot.com",
  messagingSenderId: "640989627301",
  appId: "1:640989627301:web:d46e7688539bbc0134de4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export {db};