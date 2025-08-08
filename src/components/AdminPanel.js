import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();
  const [artikli, setArtikli] = useState([]);
  const [noviArtikl, setNoviArtikl] = useState({ name: '', cijena: '', tag: '', ukratko: '' });

  const ADMIN_EMAIL = "anteo.augustincic@gmail.com";
  const isAdmin = !!user && user.email === ADMIN_EMAIL;


  useEffect(() => {
    const fetchArtikli = async () => {
      const querySnapshot = await getDocs(collection(db, 'prodaja'));
      const podaci = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArtikli(podaci);
    };
    fetchArtikli();
  }, []);

  const dodajArtikl = async () => {
    await addDoc(collection(db, 'prodaja'), noviArtikl);
    alert('Artikl dodan!');
  };

  const obrisiArtikl = async (id) => {
    await deleteDoc(doc(db, 'prodaja', id));
    setArtikli(prev => prev.filter(a => a.id !== id));
  };

  if (!isAdmin) return <p style={{ color: 'red' }}>Nemaš pristup ovoj stranici.</p>;

  return (
    <div className="page-layout">
      <h2>Admin Panel</h2>
      <h3>Dodaj novi artikl</h3>
      <input placeholder="Ime" onChange={e => setNoviArtikl({ ...noviArtikl, name: e.target.value })} />
      <input placeholder="Cijena" onChange={e => setNoviArtikl({ ...noviArtikl, cijena: e.target.value })} />
      <input placeholder="Tag" onChange={e => setNoviArtikl({ ...noviArtikl, tag: e.target.value })} />
      <input placeholder="Ukratko" onChange={e => setNoviArtikl({ ...noviArtikl, ukratko: e.target.value })} />
      <button onClick={dodajArtikl}>Dodaj</button>

      <h3>Postojeći artikli</h3>
      <ul>
        {artikli.map((a) => (
          <li key={a.id}>
            {a.name} – {a.cijena} €
            <button onClick={() => obrisiArtikl(a.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
