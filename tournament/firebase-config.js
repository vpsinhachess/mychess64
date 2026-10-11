// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBgT_-DwDwADSPUhUU-ssZhOMqa0Sa1g",
  authDomain: "mychess64-25df9.firebaseapp.com",
  databaseURL: "https://mychess64-25df9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mychess64-25df9",
  storageBucket: "mychess64-25df9.firebasestorage.app",
  messagingSenderId: "849469117834",
  appId: "1:849469117834:web:f7d0e42578a2ca0184a473",
  measurementId: "G-HLW9JS1QPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
