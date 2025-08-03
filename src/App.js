import firebase from "firebase/compat/app";
import { db } from "./firebase";
import { collection, getDoc, query, getDocs, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";

// Step 1: Query vozila
const q = query(collection(db, "vozila"));
const snapShot = await getDocs(q);

snapShot.forEach(async (docSnap) => {
    const voziloData = docSnap.data();
    console.log(docSnap.id, " => ", voziloData);

    const userRef = voziloData.user; // ✅ This is a DocumentReference

    if (userRef) {
        const userSnap = await getDoc(userRef); // ✅ Fetch the referenced user doc
        if (userSnap.exists()) {
            console.log("User data:", userSnap.data());
        } else {
            console.log("User does not exist");
        }
    }
});

function App() {
    const [vozila, setVozila] = useState([]);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <h1>samo trenutak stranica se učitava</h1>;
    }

    return (
        <div>
            <h1>Vozila</h1>
            {vozila.map((vozilo) => (
                <div key={vozilo.id}>
                    <h2>{vozilo.pogon}</h2>
                    <p>{vozilo.gume}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
