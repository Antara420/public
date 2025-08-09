import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './uredi.css';

const UrediProizvod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proizvod, setProizvod] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const dohvati = async () => {
    
    const docRef = doc(db, 'prodaja', id);
    const docSnap = await getDoc(docRef);
    console.log("Postoji dokument:", docSnap.exists());
    if (docSnap.exists()) {
      setProizvod(docSnap.data());
    }
    setLoading(false);
  };
  dohvati();
}, [id]);


  const handleChange = (e) => {
  const { name, value } = e.target;

  setProizvod((prev) => ({
    ...prev,
    [name]: name === 'slike' ? value.split(',').map((url) => url.trim()) : value,
  }));
};

  const handleSpremi = async () => {
    const docRef = doc(db, 'prodaja', id);
    await updateDoc(docRef, proizvod);
    alert("Proizvod ažuriran!");
    navigate('/admin');
  };

  if (loading) return <p>Učitavanje...</p>;
  if (!proizvod) return <p>Proizvod nije pronađen.</p>;

  return (
    <div className="uredi-container">
      <h2>Uredi proizvod</h2>
      <div className="form-grid">
        <label>Naziv</label>
        <input name="name" value={proizvod.name || ''} onChange={handleChange} />

        <label>Cijena (€)</label>
        <input name="cijena" value={proizvod.cijena || ''} onChange={handleChange} />

        <label>Tag</label>
        <input name="tag" value={proizvod.tag || ''} onChange={handleChange} />

        <label>Kratki opis</label>
        <textarea name="ukratko" value={proizvod.ukratko || ''} onChange={handleChange} rows={3} />  

        <label>Motor</label>
        <input name="motor" value={proizvod.motor || ''} onChange={handleChange} />

        <label>Baterija</label>
        <input name="baterija" value={proizvod.baterija || ''} onChange={handleChange} />

        <label>Zaslon</label>
        <input name="zaslon" value={proizvod.zaslon || ''} onChange={handleChange} />

        <label>Težina</label>
        <input name="tezina" value={proizvod.tezina || ''} onChange={handleChange} />

        <label>Okvir</label>
        <input name="okvir" value={proizvod.okvir || ''} onChange={handleChange} />

        <label>Pogon</label>
        <input name="pogon" value={proizvod.pogon || ''} onChange={handleChange} />

        <label>Suspenzija</label>
        <input name="suspenzija" value={proizvod.suspenzija || ''} onChange={handleChange} />

        <label>Kotači</label>
        <input name="kotaci" value={proizvod.kotaci || ''} onChange={handleChange} />

        <label>Kočnice</label>
        <input name="kocnice" value={proizvod.kocnice || ''} onChange={handleChange} />

        <label>Gume</label>
        <input name="gume" value={proizvod.gume || ''} onChange={handleChange} />

        <label>Pribor</label>
        <input name="pribor" value={proizvod.pribor || ''} onChange={handleChange} />

        <label>Sastav</label>
        <input name="sastav" value={proizvod.sastav || ''} onChange={handleChange} />

        <label>Skladištenje</label>
        <input name="skladistenje" value={proizvod.skladistenje || ''} onChange={handleChange} />

        <label>Ograničenje</label>
        <input name="ogranicenje" value={proizvod.ogranicenje || ''} onChange={handleChange} />

        <label>Slika</label>
        <input name="slika" value={proizvod.slika || ''} onChange={handleChange} />

        <label>Slike</label>
        <input name="slike" value={proizvod.slike ? proizvod.slike.join(', ') : ''}onChange={handleChange}/>
 
        <label>Model</label>
        <input name="model" value={proizvod.model || ''} onChange={handleChange} />

        <button className="slatkis" onClick={handleSpremi}>💾 Spremi promjene</button>

      </div>

      
    </div>
  );
};

export default UrediProizvod;
