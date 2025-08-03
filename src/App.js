import firebase from "firebase/compat/app";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    const data = doc.data();

    console.log(data.name);
});

// console.log(scooterData[0].baterija);

function App() {
    const [vozila, setVozila] = useState([]);
    const [loading, setLoading] = useState(false);

    // const ref = getFirestore().collection("Scooterino");

    // function getVozila(){
    //   setLoading(true);
    //   ref.onSnapshot((querySnapshot)=>{
    //     const items = [];
    //     querySnapshot.forEach((doc)=>{
    //       items.push(doc.data());
    //     });
    //     setVozila(items);
    //     setLoading(false);
    //   })
    // }
    //   useEffect(()=>{
    //     getVozila();
    //   },[]);
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
