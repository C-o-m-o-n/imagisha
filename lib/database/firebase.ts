// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVFD6Mw0A5zaXydmqyvFPaxQgdfuOrGqg",
  authDomain: "imagisha.firebaseapp.com",
  projectId: "imagisha",
  storageBucket: "imagisha.appspot.com",
  messagingSenderId: "221557836487",
  appId: "1:221557836487:web:9c17722ff0223c2e170ce2",
  measurementId: "G-DT62GBBWNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);