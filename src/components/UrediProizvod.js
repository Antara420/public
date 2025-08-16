import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './uredi.css';

const UrediProizvod = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proizvod, setProizvod] = useState({
    imageData: { glavna: '', dodatne: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dohvati = async () => {
      const docRef = doc(db, 'prodaja', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProizvod(docSnap.data());
      } else {
        alert('Proizvod nije pronađen.');
        navigate('/admin');
      }
      setLoading(false);
    };

    dohvati();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProizvod((prev) => ({ ...prev, [name]: value }));
  };

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
      setProizvod((prev) => ({
        ...prev,
        imageData: { ...prev.imageData, glavna: base64 },
      }));
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

    setProizvod((prev) => ({
      ...prev,
      imageData: {
        ...prev.imageData,
        dodatne: [...(prev.imageData?.dodatne || []), ...noveSlike],
      },
    }));
  };

  const handleSpremi = async () => {
    const docRef = doc(db, 'prodaja', id);

    const totalSize = JSON.stringify(proizvod).length;
    if (totalSize > 950000) {
      alert("Ukupna veličina podataka prelazi ograničenje Firestore dokumenta (1MB). Uklonite neke slike.");
      return;
    }

    await updateDoc(docRef, proizvod);
    alert("Proizvod ažuriran!");
    navigate('/admin');
  };

  if (loading) return <p>Učitavanje...</p>;

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

        {/* Dodatna polja (po potrebi proširi) */}
        <label>Model</label>
        <input name="model" value={proizvod.model || ''} onChange={handleChange} />

        {/* Glavna slika */}
        <label>Glavna slika</label>
        <input type="file" accept="image/*" onChange={handleGlavnaSlikaUpload} />
        {proizvod.imageData?.glavna && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={proizvod.imageData.glavna} alt="Glavna slika" style={{ width: '200px' }} />
            <button onClick={() => {
              setProizvod((prev) => ({
                ...prev,
                imageData: { ...prev.imageData, glavna: '' },
              }));
            }}>❌ Ukloni</button>
          </div>
        )}

        {/* Dodatne slike */}
        <label>Dodatne slike</label>
        <input type="file" accept="image/*" multiple onChange={handleDodatneSlikeUpload} />
        {proizvod.imageData?.dodatne?.length > 0 && (
          <div className="slike-preview">
            {proizvod.imageData.dodatne.map((b64, i) => (
              <div key={i} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                <img src={b64} alt={`dodatna-${i}`} style={{ width: '100px' }} />
                <button
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 6px',
                  }}
                  onClick={() => {
                    setProizvod((prev) => ({
                      ...prev,
                      imageData: {
                        ...prev.imageData,
                        dodatne: prev.imageData.dodatne.filter((_, index) => index !== i),
                      },
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="slatkis" onClick={handleSpremi}>💾 Spremi promjene</button>
      </div>
    </div>
  );
};

export default UrediProizvod;
