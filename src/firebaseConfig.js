import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // THE CONFIG FROM YOUR FIREBASE CONSOLE
  apiKey: "AIzaSyBxrr1oBwj0xIBSvFoXBqIqKtqH_BbQkqM",
  authDomain: "blog-d8935.firebaseapp.com",
  projectId: "blog-d8935",
  storageBucket: "blog-d8935.appspot.com",
  messagingSenderId: "40335610312",
  appId: "1:40335610312:web:a9f3f50abbcc9a60bc30fd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
