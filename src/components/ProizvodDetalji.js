import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css';
const ProizvodDetalji = () => {
  const { id } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVozilo = async () => {
      try {
        const docRef = doc(db, "prodaja", id);
        const docSnap = await getDoc(docRef);

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
    };

    fetchVozilo();
  }, [id]);

  if (loading) return <p>Učitavanje...</p>;
  if (!vozilo) return <p>Proizvod nije pronađen.</p>;

  return (
    <div className='page-layout'>
        <div className='cigla'>
      
        <div className='levi'>
            <h2>{vozilo.name}</h2>
            {vozilo.slike && Array.isArray(vozilo.slike) && vozilo.slike.map((url, index) => (
  <img key={index} src={url} alt={`Slika ${index + 1}`} className="proizvod-slika" />
))}
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
      <p className='cijena'> {vozilo.cijena} €</p>    
      </div>
      <div className='site-footer'>
        &copy; 2025. Sva prava pridržana.
      </div>
    </div>
  );
};

export default ProizvodDetalji;
