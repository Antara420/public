import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC--q9Sou7yJepquWI4F21Ak_OlRRsm2l4",
    authDomain: "testproject-5b26b.firebaseapp.com",
    projectId: "testproject-5b26b",
    storageBucket: "testproject-5b26b.firebasestorage.app",
    messagingSenderId: "1072313707446",
    appId: "1:1072313707446:web:b980cdc8cf3753c2412f17",
    measurementId: "G-4T9E2WG7JT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
