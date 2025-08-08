import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { collection, query, getDocs, getDoc, where, doc } from "firebase/firestore";
import { db } from "./firebase";
import './App.css';

import Navbar from './components/Navbar';
import Pocetna from './components/Pocetna';
import ProizvodDetalji from './components/ProizvodDetalji';
import Adresa from "./components/Adresa";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";
import Kosarica from "./components/Kosarica";
import AdminPanel from "./components/AdminPanel";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";

function AppContent() {
  const [prodaja, setProdaja] = useState([]);
  const [selectedTag, setSelectedTag] = useState("svi");
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const provjeriAdmina = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsAdmin(docSnap.data().role === 'admin');
      }
    };
    provjeriAdmina();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      let q = selectedTag === "svi"
        ? query(collection(db, "prodaja"))
        : query(collection(db, "prodaja"), where("tag", "==", selectedTag));

      const snapShot = await getDocs(q);
      const vozila = [];

      for (const docSnap of snapShot.docs) {
        const voziloData = docSnap.data();
        vozila.push({
          id: docSnap.id,
          name: voziloData.name || "Nepoznati proizvod",
          ukratko: voziloData.ukratko || "",
          cijena: voziloData.cijena || "",
          tag: voziloData.tag || "",
          slike: voziloData.slike || [],
          slika: voziloData.slika || "",
          ...voziloData
        });
      }

      setProdaja(vozila);
    };

    fetchData();
  }, [selectedTag]);

  return (
    <div className='page-layout'>
      <div className='header'>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Pocetna prodaja={prodaja} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />} />
        <Route path="/adresa" element={<Adresa />} />
        <Route path="/kosarica" element={<Kosarica />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/proizvod/:id" element={<ProizvodDetalji />} />
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
