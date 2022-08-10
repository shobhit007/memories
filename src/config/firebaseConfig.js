import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmWl6f11FzVVJrcVuD8yMnDXwL0RNUuB8",
  authDomain: "firstrnfirebaseapp.firebaseapp.com",
  projectId: "firstrnfirebaseapp",
  storageBucket: "firstrnfirebaseapp.appspot.com",
  messagingSenderId: "702096449821",
  appId: "1:702096449821:web:8d15d42666b6485cd141f4",
  measurementId: "G-96YZC8W2E4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export { auth, db, firebase, storage };
