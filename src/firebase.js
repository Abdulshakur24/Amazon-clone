import firebase from "firebase";
const { KEY } = require("./Config");
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: KEY.apiKey,
  authDomain: KEY.authDomain,
  projectId: "clone-42927",
  storageBucket: "clone-42927.appspot.com",
  messagingSenderId: KEY.measurementId,
  appId: KEY.appId,
  measurementId: KEY.measurementId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
