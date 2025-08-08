// firebase.js (ili kako god zoveš ovaj fajl)

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // OVDJE je bitan import
import { getAuth } from "firebase/auth";

// Firebase konfiguracija
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

// Inicijalizacija Firebase
const app = initializeApp(firebaseConfig);

// Inicijalizacija servisa
const db = getFirestore(app);
const auth = getAuth(app);

// Funkcija za dodavanje admin korisnika
const addAdminUser = async (uid, email) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email: email,
      role: "admin",
      createdAt: new Date()
    });

    console.log("Admin user added successfully");
  } catch (error) {
    console.error("Error adding admin user: ", error);
  }
};

// Exportaš što ti treba
export { db, auth, addAdminUser };
