// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUhf_e-RaIWJ-uy80HUKVcgnsjSS41v7k",
  authDomain: "coba-31138.firebaseapp.com",
  projectId: "coba-31138",
  storageBucket: "coba-31138.appspot.com",
  messagingSenderId: "354112951775",
  appId: "1:354112951775:web:90ba5b24a0164033c4606a",
  measurementId: "G-V10T569DTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);