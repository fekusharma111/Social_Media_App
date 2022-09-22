// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaHS_IDyQUlkOPI6fPTboO2fSrGGk8Vao",
  authDomain: "socialmedialatest-715b4.firebaseapp.com",
  projectId: "socialmedialatest-715b4",
  storageBucket: "socialmedialatest-715b4.appspot.com",
  messagingSenderId: "141902357935",
  appId: "1:141902357935:web:034cdd9d26d62fe62e7b5a",
  measurementId: "G-4YNQ4X0V7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
