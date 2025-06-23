// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2SEsQqGO8tXIuIg8seVdt8t20_PpQMdM",
  authDomain: "carinventory1710.firebaseapp.com",
  projectId: "carinventory1710",
  storageBucket: "carinventory1710.appspot.com",
  messagingSenderId: "869643546993",
  appId: "1:869643546993:web:090a767cb09d2f483506d0",
  measurementId: "G-HL086JHQVZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
