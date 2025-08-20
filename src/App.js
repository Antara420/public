import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
    collection,
    query,
    onSnapshot,
    where,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

import "./App.css";

import Navbar from "./components/Navbar";
import Pocetna from "./components/Pocetna";
import ProizvodDetalji from "./components/ProizvodDetalji";
import Adresa from "./components/Adresa";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";
import Kosarica from "./components/Kosarica";
import AdminPanel from "./components/AdminPanel";
import UrediProizvod from "./components/UrediProizvod";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";

function AppContent() {
    const [prodaja, setProdaja] = useState([]);
    const [selectedTag, setSelectedTag] = useState("svi");
    const [isAdmin, setIsAdmin] = useState(false);

    const { user } = useAuth();

    // Provjera admin prava
    useEffect(() => {
        const provjeriAdmina = async () => {
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setIsAdmin(docSnap.data().role === "admin");
            }
        };
        provjeriAdmina();
    }, [user]);

    // Real-time dohvaćanje artikala
    useEffect(() => {
        const q =
            selectedTag === "svi"
                ? collection(db, "prodaja")
                : query(
                      collection(db, "prodaja"),
                      where("tag", "==", selectedTag),
                  );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const vozila = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                name: docSnap.data().name || "Nepoznati proizvod",
                ukratko: docSnap.data().ukratko || "",
                cijena: docSnap.data().cijena || "",
                tag: docSnap.data().tag || "",
                slike: docSnap.data().slike || [],
                slika: docSnap.data().slika || "",
                ...docSnap.data(),
            }));

            setProdaja(vozila);
        });

        return () => unsubscribe(); // cleanup listener
    }, [selectedTag]);

    return (
        <div className="page-layout">
            <div className="header">
                <Navbar />
            </div>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Pocetna
                            prodaja={prodaja}
                            selectedTag={selectedTag}
                            setSelectedTag={setSelectedTag}
                        />
                    }
                />
                <Route path="/adresa" element={<Adresa />} />
                <Route path="/kosarica" element={<Kosarica />} />
                <Route path="/prijava" element={<Prijava />} />
                <Route path="/registracija" element={<Registracija />} />
                <Route path="/proizvod/:id" element={<ProizvodDetalji />} />
                <Route path="/admin/uredi/:id" element={<UrediProizvod />} />
                {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
