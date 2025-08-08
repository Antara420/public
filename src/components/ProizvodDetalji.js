import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css';
import { useAuth } from '../components/AuthContext';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useCart } from '../components/CartContext';

const ProizvodDetalji = () => {
  const { id } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [komentari, setKomentari] = useState([]);
  const [noviKomentar, setNoviKomentar] = useState('');
  const [aktivnaSlika, setAktivnaSlika] = useState(null);

  useEffect(() => {
    const fetchVozilo = async () => {
      try {
        const docRef = doc(db, "prodaja", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
          setVozilo(data);
          if (data.slike && data.slike.length > 0) {
           setAktivnaSlika(data.slike[0]);}
        if (docSnap.exists()) {
          setVozilo(docSnap.data());
        } else {
          console.log("Proizvod ne postoji.");
        }
      } catch (error) {
        console.error("Greška pri dohvatu podataka:", error);
      } finally {
        setLoading(false);
      }
    };  fetchVozilo();    
  }, [id]);


  useEffect(() => {
  const komentariRef = collection(db, 'prodaja', id, 'komentari');

  const unsubscribe = onSnapshot(komentariRef, (snapshot) => {
    const komentariData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setKomentari(komentariData);
  });

    
  return () => unsubscribe();
}, [id]);

const {dodajUKosaricu}=useCart();

const handleKomentarSubmit = async (e) => {
  e.preventDefault();
  if (!noviKomentar.trim()) return;

  try {
    const komentariRef = collection(db, 'prodaja', id, 'komentari');
    await addDoc(komentariRef, {
      tekst: noviKomentar,
      korisnik: user.displayName || user.email,
      timestamp: serverTimestamp()
    });
    setNoviKomentar('');
  } catch (err) {
    console.error("Greška pri slanju komentara:", err);
  }
};


  if (loading) return <p>Učitavanje...</p>;
  if (!vozilo) return <p>Proizvod nije pronađen.</p>;

  return (
    <div className='page-layout'>
        <div className='cigla'>
      
        <div className='levi'>
           <h2>{vozilo.name}</h2>

  {aktivnaSlika && (
    <img src={aktivnaSlika} alt="Aktivna slika" className="aktivna-slika" />)}
    <div className="thumbnail-container">
    {vozilo.slike &&
      Array.isArray(vozilo.slike) &&
      vozilo.slike.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Thumbnail ${index + 1}`}
          className={`thumbnail ${aktivnaSlika === url ? 'aktivna' : ''}`}
          onClick={() => setAktivnaSlika(url)}  />  ))} 
        </div>
</div>

        <div className='desni'>
            {vozilo.ukratko && (<p><strong>Ukratko:</strong> {vozilo.ukratko}</p>)}
            {vozilo.motor && (<p><strong>Motor:</strong> {vozilo.motor}</p>)}
            {vozilo.baterija && (<p><strong>Baterija:</strong> {vozilo.baterija}</p>)}
            {vozilo.zaslon && (<p><strong>Ekran:</strong> {vozilo.zaslon}</p>)}
            {vozilo.tezina && (<p><strong>Težina:</strong> {vozilo.tezina}</p>)}
            {vozilo.sastav && (<p><strong>Sastav okvira:</strong> {vozilo.sastav}</p>)}
            {vozilo.pogon && (<p><strong>Pogon:</strong> {vozilo.pogon}</p>)}
            {vozilo.suspenzija && (<p><strong>Suspenzija:</strong> {vozilo.suspenzija}</p>)}
            {vozilo.kotaci && (<p><strong>Kotači:</strong> {vozilo.kotaci}</p>)}
            {vozilo.pribor && (<p><strong>Pribor:</strong> {vozilo.pribor}</p>)}
            {vozilo.skladistenje && (<p><strong>Skladištenje:</strong> {vozilo.skladistenje}</p>)}
            {vozilo.ogranicenje && (<p><strong>Ograničenje:</strong> {vozilo.ogranicenje}</p>)}
            {vozilo.gume && (<p><strong>Gume:</strong> {vozilo.gume}</p>)}
            {vozilo.kocnice && (<p><strong>Kočnice:</strong> {vozilo.kocnice}</p>)}
        </div>
         <button className='dodaj-gumb' onClick={() => dodajUKosaricu({ ...vozilo,  id: vozilo.id })}>Dodaj u košaricu – {vozilo.cijena},00€</button>   
      </div>

      <div className='komentari'>
        <h3>Komentari</h3>
        {komentari.length === 0 && <p>Nema komentara još.</p>}
        <ul>
          {komentari.map((komentar) => (
          <li key={komentar.id}>
            <strong>{komentar.korisnik}:</strong> {komentar.tekst}
          </li>
        ))}
       </ul>

        {user ? (
        <form onSubmit={handleKomentarSubmit}>
        <textarea
          value={noviKomentar}
          onChange={(e) => setNoviKomentar(e.target.value)}
          placeholder="Napiši komentar..."
          rows={3}
          required />
          <button type="submit">Pošalji</button>
        </form>
  ) : (
        <p>Morate biti prijavljeni da biste ostavili komentar.</p>
  )}
      </div>

      <div className='site-footer'>
        &copy; 2025. Sva prava pridržana.
      </div>
    </div>
  );
};

export default ProizvodDetalji;
