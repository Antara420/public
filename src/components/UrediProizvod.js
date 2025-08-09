import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './uredi.css'; // ➕ dodaš svoj stil tu

const UrediProizvod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proizvod, setProizvod] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    console.log("ID proizvoda:", id); // 👈 za debug
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
    setProizvod({ ...proizvod, [e.target.name]: e.target.value });
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
      </div>

      <button className="spremi-btn" onClick={handleSpremi}>💾 Spremi promjene</button>
    </div>
  );
};

export default UrediProizvod;
