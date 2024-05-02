import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJJMjI37iC7O3HX1JQY8Of5E2JzF8NVX4",
  authDomain: "pesto-6986e.firebaseapp.com",
  projectId: "pesto-6986e",
  storageBucket: "pesto-6986e.appspot.com",
  messagingSenderId: "1085525661735",
  appId: "1:1085525661735:web:578d68f1f44e2ae6705602",
  measurementId: "G-6GSCL1LC6L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)

export { app, auth, database };