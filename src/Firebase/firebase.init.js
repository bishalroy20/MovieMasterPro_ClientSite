// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOX_SCHeEry7P-Lu7aHzW0i_03Od1r6cI",
  authDomain: "moviemasterpro-20.firebaseapp.com",
  projectId: "moviemasterpro-20",
  storageBucket: "moviemasterpro-20.firebasestorage.app",
  messagingSenderId: "464035028594",
  appId: "1:464035028594:web:bf3cb0c2cdfcb890d46ceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

// project-464035028594