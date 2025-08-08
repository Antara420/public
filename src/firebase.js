import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCcsZmScxtiFVDC7AIG7fQPKxefgQgjs-c",
  authDomain: "scooterino-projekt-7b6c6.firebaseapp.com",
  databaseURL: "https://scooterino-projekt-7b6c6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scooterino-projekt-7b6c6",
  storageBucket: "scooterino-projekt-7b6c6.firebasestorage.app",
  messagingSenderId: "702494137916",
  appId: "1:702494137916:web:d497d653126ee8e556ed39",
  measurementId: "G-SWVTZMS4QJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);