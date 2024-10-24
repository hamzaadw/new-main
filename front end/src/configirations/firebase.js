// Import the functions you need from the SDKs you need

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD914BzagHzNrID9DCIyB1Ja98SnzRF740",
  authDomain: "ecom2-ff87c.firebaseapp.com",
  projectId: "ecom2-ff87c",
  storageBucket: "ecom2-ff87c.appspot.com",
  messagingSenderId: "628943936577",
  appId: "1:628943936577:web:7f782b49cebdc2dea2fac0",
  measurementId: "G-BGME59TN9X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


export {app, db, storage, auth}