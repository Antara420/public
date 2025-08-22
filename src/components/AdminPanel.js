import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './uredi.css';

const AdminPanel = () => {
  const { user } = useAuth();
  const [artikli, setArtikli] = useState([]);
  const [noviArtikl, setNoviArtikl] = useState({
    name: '',
    cijena: '',
    tag: '',
    ukratko: '',
    imageData: {
      glavna: '',
      dodatne: []
    }
  });

  const ADMIN_EMAIL = "anteo.augustincic@gmail.com";
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    const fetchArtikli = async () => {
      const querySnapshot = await getDocs(collection(db, 'prodaja'));
      const podaci = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setArtikli(podaci);
    };
    fetchArtikli();
  }, []);

  const pretvoriUSlikuBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGlavnaSlikaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 800 * 1024) {
      alert("Slika mora biti manja od 800KB");
      return;
    }

    try {
      const base64 = await pretvoriUSlikuBase64(file);
      setNoviArtikl((prev) => ({
        ...prev,
        imageData: { ...prev.imageData, glavna: base64 },
      }));
      alert("Glavna slika učitana!");
    } catch (err) {
      console.error("Greška kod glavne slike:", err);
    }
  };

  const handleDodatneSlikeUpload = async (e) => {
    const files = e.target.files;
    const noveSlike = [];

    for (const file of files) {
      if (file.size > 800 * 1024) {
        alert(`Slika "${file.name}" je veća od 800KB i nije učitana.`);
        continue;
      }

      try {
        const base64 = await pretvoriUSlikuBase64(file);
        noveSlike.push(base64);
      } catch (err) {
        console.error("Greška kod slike:", file.name, err);
      }
    }

    setNoviArtikl((prev) => ({
      ...prev,
      imageData: {
        ...prev.imageData,
        dodatne: [...(prev.imageData?.dodatne || []), ...noveSlike],
      },
    }));
  };

  const dodajArtikl = async () => {
    const totalSize = JSON.stringify(noviArtikl).length;
    if (totalSize > 950000) {
      alert("Ukupna veličina podataka prelazi Firestore ograničenje (1MB). Ukloni neke slike.");
      return;
    }

    await addDoc(collection(db, 'prodaja'), noviArtikl);
    alert('Artikl dodan!');
    setNoviArtikl({
      name: '',
      cijena: '',
      tag: '',
      ukratko: '',
      imageData: { glavna: '', dodatne: [] }
    });
  };

  const obrisiArtikl = async (id) => {
    await deleteDoc(doc(db, 'prodaja', id));
    setArtikli(prev => prev.filter(a => a.id !== id));
  };

  if (!isAdmin) {
    return <p style={{ color: 'red' }}>Nemaš pristup ovoj stranici.</p>;
  }

  return (
    <div className="page-layout">
      <div className="uredi-container" style={{ maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center' }}>Dodavanje proizvoda:</h2>
        <div className="form-grid">
          <h3 style={{ fontSize: '35px', color: 'white' }}>➕ Dodaj novi artikl</h3>

          <input placeholder="Ime" value={noviArtikl.name} onChange={e => setNoviArtikl({ ...noviArtikl, name: e.target.value })} />
          <input placeholder="Cijena" value={noviArtikl.cijena} onChange={e => setNoviArtikl({ ...noviArtikl, cijena: e.target.value })} />
          <input placeholder="Tag" value={noviArtikl.tag} onChange={e => setNoviArtikl({ ...noviArtikl, tag: e.target.value })} />
          <input placeholder="Motor" value={noviArtikl.motor} onChange={e => setNoviArtikl({ ...noviArtikl, motor: e.target.value })} />
          <input placeholder="Ukratko" value={noviArtikl.ukratko} onChange={e => setNoviArtikl({ ...noviArtikl, ukratko: e.target.value })} />
          <input placeholder="Baterija" value={noviArtikl.baterija} onChange={e => setNoviArtikl({ ...noviArtikl, baterija: e.target.value })} />
          <input placeholder="Zaslon" value={noviArtikl.zaslon} onChange={e => setNoviArtikl({ ...noviArtikl, zaslon: e.target.value })} />
          <input placeholder="Težina" value={noviArtikl.tezina} onChange={e => setNoviArtikl({ ...noviArtikl, tezina: e.target.value })} />
          <input placeholder="Okvir" value={noviArtikl.okvir} onChange={e => setNoviArtikl({ ...noviArtikl, okvir: e.target.value })} />
          <input placeholder="Pogon" value={noviArtikl.pogon} onChange={e => setNoviArtikl({ ...noviArtikl, pogon: e.target.value })} />
          <input placeholder="Suspenzija" value={noviArtikl.suspenzija} onChange={e => setNoviArtikl({ ...noviArtikl, suspenzija: e.target.value })} />
          <input placeholder="Kotači" value={noviArtikl.kotaci} onChange={e => setNoviArtikl({ ...noviArtikl, kotaci: e.target.value })} />
          <input placeholder="Kočnice" value={noviArtikl.kocnice} onChange={e => setNoviArtikl({ ...noviArtikl, kocnice: e.target.value })} />
          <input placeholder="Gume" value={noviArtikl.gume} onChange={e => setNoviArtikl({ ...noviArtikl, gume: e.target.value })} />
          <input placeholder="Pribor" value={noviArtikl.pribor} onChange={e => setNoviArtikl({ ...noviArtikl, pribor: e.target.value })} />
          <input placeholder="Sastav" value={noviArtikl.sastav} onChange={e => setNoviArtikl({ ...noviArtikl, sastav: e.target.value })} />
          <input placeholder="Skladištenje" value={noviArtikl.skladistenje} onChange={e => setNoviArtikl({ ...noviArtikl, skladistenje: e.target.value })} />
          <input placeholder="Ograničenje" value={noviArtikl.ogranicenje} onChange={e => setNoviArtikl({ ...noviArtikl, ogranicenje: e.target.value })} />

          <label>Odaberi glavnu sliku proizvoda:</label>
          <input type="file" accept="image/*" onChange={handleGlavnaSlikaUpload} />

          <label>Odaberi dodatne slike proizvoda:</label>
          <input type="file" accept="image/*" multiple onChange={handleDodatneSlikeUpload} />

          <input placeholder="Model" value={noviArtikl.model} onChange={e => setNoviArtikl({ ...noviArtikl, model: e.target.value })} />
          <input placeholder="Količina" value={noviArtikl.kolicina} onChange={e => setNoviArtikl({ ...noviArtikl, kolicina: e.target.value })} />

          <button className='slatkis' onClick={dodajArtikl}>Dodaj</button>

          <h3 style={{ fontSize: '35px' }}>📦 Postojeći artikli</h3>
          <ul style={{ fontSize: '25px' }}>
            {artikli.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong> – {a.cijena} €
                <button style={{ margin: '3px' }} className='slatkis' onClick={() => obrisiArtikl(a.id)}>🗑 Obriši</button>
                <Link to={`/admin/uredi/${a.id}`}>
                  <button className='slatkis'>✏️ Uredi</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
