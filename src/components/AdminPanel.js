import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import './uredi.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const AdminPanel = () => {
  const { user } = useAuth();
  const [artikli, setArtikli] = useState([]);
  const [noviArtikl, setNoviArtikl] = useState({
    name: '',
    cijena: '',
    tag: '',
    ukratko: ''
  });

  const ADMIN_EMAIL = "anteo.augustincic@gmail.com";
  const isAdmin = !!user && user.email === ADMIN_EMAIL;

  

  // Dohvati sve proizvode iz Firestore-a
  useEffect(() => {
    const fetchArtikli = async () => {
      const querySnapshot = await getDocs(collection(db, 'prodaja'));
      const podaci = querySnapshot.docs.map(doc => ({
        id: doc.id,              // Firestore ID
        ...doc.data()
      }));
      setArtikli(podaci);
    };
    fetchArtikli();
  }, []);

  // Dodaj novi proizvod
  const dodajArtikl = async () => {
    await addDoc(collection(db, 'prodaja'), noviArtikl);
    alert('Artikl dodan!');
    setNoviArtikl({ name: '', cijena: '', tag: '', ukratko: '' }); // očisti polja
  };

  // Obriši proizvod
  const obrisiArtikl = async (id) => {
    await deleteDoc(doc(db, 'prodaja', id));
    setArtikli(prev => prev.filter(a => a.id !== id));
  };

  //uredi sliku
  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const storage = getStorage(); // koristi defaultni storage iz firebase.js
  const storageRef = ref(storage, `slike_proizvoda/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setNoviArtikl(prev => ({ ...prev, slika: url }));
    alert("Slika uspješno učitana!");
  } catch (error) {
    console.error("Greška prilikom uploada slike:", error);
    alert("Upload nije uspio.");
  }
};
//uredi slike
const handleMultipleFileUpload = async (e) => {
  const files = e.target.files;
  const urls = [];

  const storage = getStorage();

  for (const file of files) {
    const storageRef = ref(storage, `slike_proizvoda/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    } catch (error) {
      console.error("Greška kod slike:", file.name, error);
    }
  }

  setNoviArtikl(prev => ({ ...prev, slike: urls }));
};

  // Ako nije admin – zabrani pristup
  if (!isAdmin) {
    return <p style={{ color: 'red' }}>Nemaš pristup ovoj stranici.</p>;
  }

  return (
    <div className="page-layout">
      <div class="uredi-container">
        <h2 style={{ float:'center'}}>Dodavanje proizvoda:</h2>
        <div class="form-grid">
          <h3 style={{fontSize:'35px', color:'white'}}>➕ Dodaj novi artikl</h3>
          <input placeholder= "Ime" value={noviArtikl.name} onChange={e => setNoviArtikl({ ...noviArtikl, name: e.target.value })}/>
          <input placeholder="Cijena" value={noviArtikl.cijena} onChange={e => setNoviArtikl({ ...noviArtikl, cijena: e.target.value })}/>
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
          <label>Odaberi sliku proizvoda:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          <label>Odaberi slike proizvoda:</label>
          <input type="file" accept="image/*" multiple onChange={handleMultipleFileUpload} />
          <input placeholder="Model" value={noviArtikl.model} onChange={e => setNoviArtikl({ ...noviArtikl, model: e.target.value })} />
          <input placeholder= "Količina" value={noviArtikl.kolicina} onChange={e => setNoviArtikl({ ...noviArtikl, kolicina: e.target.value })}/>

          <button className='slatkis' onClick={dodajArtikl}>Dodaj</button> 
          <h3 style={{ fontSize:'35px', }}>📦 Postojeći artikli</h3>
          <ul style={{ fontSize:'25px', }}>
            {artikli.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong> – {a.cijena} €
                <button style={{float:'right'}} className='slatkis' onClick={() => obrisiArtikl(a.id)}>🗑 Obriši</button>
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
