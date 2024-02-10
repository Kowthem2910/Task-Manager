// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7lUqziIECHq5l99AAjpUBu9RAu8QtRIk",
  authDomain: "test-project-1f6b3.firebaseapp.com",
  projectId: "test-project-1f6b3",
  storageBucket: "test-project-1f6b3.appspot.com",
  messagingSenderId: "211932935161",
  appId: "1:211932935161:web:ce637f101e8505b2558328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
