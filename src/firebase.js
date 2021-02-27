import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmzlhvP9w0IFxDiGPxjOpWwJIHBhYk3JM",
  authDomain: "clone-42927.firebaseapp.com",
  projectId: "clone-42927",
  storageBucket: "clone-42927.appspot.com",
  messagingSenderId: "436802317368",
  appId: "1:436802317368:web:52e0e4ed9b92cbaa6d4acd",
  measurementId: "G-B6XL556673",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
