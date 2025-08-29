import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { useState } from "react";
import Footer from "./Footer";

const Pocetna = ({ prodaja, selectedTag, setSelectedTag }) => {
  const { dodajUKosaricu, poruka } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.email === 'anteo.augustincic@gmail.com';
  const [pokaziLoginModal, setPokaziLoginModal] = useState(false);
  
   const handleDodajUKosaricu = (vozilo) => {
  if (!user) {
    setPokaziLoginModal(true);  
    return;
  }
  dodajUKosaricu({ ...vozilo, id: vozilo.id });
};

  return (
    <div className="page-layout">
      {poruka && (<div className="toast">{poruka}</div>)}
      <div className="cigla-wrap">
        <div className='main-content'>
          <h1>Vozila na prodaju</h1><br/>

          <div className="filters">
            <button className={selectedTag === "svi" ? "active" : ""} onClick={() => setSelectedTag("svi")}>Sve</button>
            <button className={selectedTag === "eRomobil" ? "active" : ""} onClick={() => setSelectedTag("eRomobil")}>E-romobil</button>
            <button className={selectedTag === "eBajk" ? "active" : ""} onClick={() => setSelectedTag("eBajk")}>E-bike</button>
            <button className={selectedTag === "eScooter" ? "active" : ""} onClick={() => setSelectedTag("eScooter")}>E-skuter</button>
            <button className={selectedTag === "dodatnaOprema" ? "active" : ""} onClick={() => setSelectedTag("dodatnaOprema")}>Kacige i dodatna oprema</button>

            {isAdmin && (
              <Link to="/admin">
                <button className="admin-btn">+ Dodaj novi artikl</button>
              </Link>
            )}
          </div>

          <div className='card-grid'>
            {pokaziLoginModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>Potrebna je prijava</h3>
      <p>Da biste dodali proizvod u košaricu, molimo prijavite se.</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link to="/prijava">
          <button className="slatkis">Prijavi se</button>
        </Link>
        <button className="slatkis" onClick={() => setPokaziLoginModal(false)}>Odustani</button>
      </div>
    </div>
  </div>
)}
            {prodaja.map((vozilo) => (
              <div key={vozilo.id} className='card'>
                <div className='card-left'>
                  {vozilo.imageData?.glavna && (<img src={vozilo.imageData.glavna} alt="Glavna slika" style={{ width: '200px', objectFit: 'cover' }} />)}
                </div>

             <div className='card-right'>
              <div className="card-fixed-header">
               <h2>{vozilo.name}</h2>
                <div className="card-actions">
                  <button className='dodaj-gumb' onClick={() => handleDodajUKosaricu({ ...vozilo, id: vozilo.id })}>Dodaj u košaricu – {vozilo.cijena},00 €</button>
                  <Link to={`/proizvod/${vozilo.id}`} className='more-btn'>Više informacija</Link>
                 </div>
               </div>

              <div className="card-scrollable-body">
              {vozilo.ukratko && (<p><strong>Ukratko:</strong> {vozilo.ukratko}</p>)}
              {vozilo.pribor && (<p><strong>Pribor:</strong> {vozilo.pribor}</p>)}
              <p className='tags'><strong>Tag:</strong> <span>{vozilo.tag}</span></p>

              {isAdmin && (
              <div style={{justifyContent:'space-between', display:'flex', alignItems:'center'}}>
              <Link to={`/admin/uredi/${vozilo.id}`} className="slatkis">Uredi</Link> </div>
              )}
            </div>
          </div>

              </div>
            ))}
          </div>
        </div>
      </div>
            
    </div>
  );
};

export default Pocetna;
