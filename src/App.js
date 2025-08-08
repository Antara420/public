import React, { useEffect, useState } from "react";
import { collection, query, getDocs, getDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pocetna from './components/Pocetna';
import ProizvodDetalji from './components/ProizvodDetalji';
import Adresa from "./components/Adresa";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import Kosarica from "./components/Kosarica";


function App() {

  const [prodaja, setProdaja] = useState([]);
  const [selectedTag, setSelectedTag] = useState("svi");

  useEffect(() => {
    const fetchData = async () => {
      let q;
      if (selectedTag === "svi") {
        q = query(collection(db, "prodaja"));
      } else {
        q = query(collection(db, "prodaja"), where("tag", "==", selectedTag));
      }

      const snapShot = await getDocs(q);
      const vozila = [];

      for (const docSnap of snapShot.docs) {
        const voziloData = docSnap.data();
        let korisnikIme = "Nepoznat korisnik";

        if (voziloData.user) {
          try {
            const userSnap = await getDoc(voziloData.user);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              korisnikIme = `${userData.ime || ""} ${userData.prezime || ""}`.trim();
            }
          } catch (err) {
            console.error("Greška kod korisnika:", err);
          }
        }

        vozila.push({
          id: docSnap.id,
          name: voziloData.name || "Nepoznati proizvod",
          ukratko: voziloData.ukratko || "",
          cijena: voziloData.cijena || "",
          tag: voziloData.tag || "",
          motor: voziloData.motor || "",
          baterija: voziloData.baterija || "",
          zaslon: voziloData.zaslon || "",
          tezina: voziloData.tezina || "",
          okvir: voziloData.okvir || "",
          pogon: voziloData.pogon || "",
          suspenzija: voziloData.suspenzija || "",
          kotaci: voziloData.kotaci || "",
          kocnice: voziloData.kocnice || "",
          gume: voziloData.gume || "",
          pribor: voziloData.pribor || "",
          sastav: voziloData.sastav || "",
          skladistenje: voziloData.skladistenje || "",
          ogranicenje: voziloData.ogranicenje || "",
          model: voziloData.model || "",
          slike: voziloData.slike || [],
          slika: voziloData.slika || "",
          korisnik: korisnikIme
        });
      }

      setProdaja(vozila);
    };

    fetchData();
  }, [selectedTag]);

  return (
    
      <AuthProvider>
        <CartProvider>
        <div className='page-layout'>
        <div className='header'>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Pocetna prodaja={prodaja} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>}/>
          <Route path="/adresa" element={<Adresa />} />
          <Route path="/kosarica" element={<Kosarica />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/proizvod/:id" element={<ProizvodDetalji />} />
          <Route path="/registracija" element={<Registracija/>} />
          </Routes>
      </div>
        </CartProvider>
      </AuthProvider>
  );
}

export default App;
