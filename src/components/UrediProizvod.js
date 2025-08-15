import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './uredi.css';

const UrediProizvod = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proizvod, setProizvod] = useState({ slika: '', slike: [] });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const storage = getStorage();

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

    if (name === 'slike') {
      setProizvod((prev) => ({
        ...prev,
        slike: value.split(',').map((s) => s.trim()),
      }));
    } else {
      setProizvod((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSpremi = async () => {
    const docRef = doc(db, 'prodaja', id);
    await updateDoc(docRef, proizvod);
    alert("Proizvod ažuriran!");
    navigate('/admin');
  };

  const handleGlavnaSlikaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `proizvodi/${id}/glavnaSlika-${Date.now()}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setProizvod((prev) => ({
        ...prev,
        slika: url,
      }));
      setImagePreview(url);
    } catch (err) {
      console.error("Greška kod uploada glavne slike:", err);
    }
  };

  const handleDodatneSlikeUpload = async (e) => {
    const files = e.target.files;
    const urls = [];

    for (const file of files) {
      const storageRef = ref(storage, `proizvodi/${id}/dodatna-${Date.now()}-${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      } catch (err) {
        console.error("Greška kod slike:", file.name, err);
      }
    }

    setProizvod((prev) => ({
      ...prev,
      slike: [...(prev.slike || []), ...urls],
    }));

    alert("Sve dodatne slike su učitane.");
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

        {/* Tehnički podaci */}
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
        <label>Model</label>
        <input name="model" value={proizvod.model || ''} onChange={handleChange} />

        {/* Slike */}
        <label>Glavna slika</label>
        <input type="file" accept="image/*" onChange={handleGlavnaSlikaUpload} />
        {proizvod.slika && <img src={proizvod.slika} alt="glavna" style={{ width: '200px' }} />}

        <label>Dodatne slike</label>
        <input type="file" accept="image/*" multiple onChange={handleDodatneSlikeUpload} />
        {proizvod.slike?.length > 0 && (
          <div className="slike-preview">
            {proizvod.slike.map((url, i) =>
              url ? (
                <img key={i} src={url} alt={`slika-${i}`} style={{ width: '100px' }} />
              ) : null
            )}
          </div>
        )}

        <button className="slatkis" onClick={handleSpremi}>💾 Spremi promjene</button>
      </div>
    </div>
  );
};

export default UrediProizvod;
