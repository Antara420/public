import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';

const Pocetna = ({ prodaja, selectedTag, setSelectedTag }) => {
  const { dodajUKosaricu } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.email === 'anteo.augustincic@gmail.com';

  return (
    <div className="page-layout">
      <div className="cigla-wrap">
        <div className='main-content'>
          <h1>Vozila na prodaju</h1><br/>

          <div className="filters">
            <button className={
              selectedTag === "svi" 
              ? "active" : ""} onClick={() => 
              setSelectedTag("svi")
              }>
                Sve
                </button>
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
            {prodaja.map((vozilo) => (
              <div key={vozilo.id} className='card'>
                <div className='card-left'>
                  {vozilo.slika && (
                    <img src={vozilo.slika} alt={vozilo.name || "Slika proizvoda"} />
                  )}
                </div>

                <div className='card-right'>
                  <h2>{vozilo.name}</h2>
                  <div style={{justifyContent:'space-between', display:'flex', alignItems:'center', flexWrap:'wrap'}}>
                    <button className='dodaj-gumb' onClick={() => dodajUKosaricu({ ...vozilo, id: vozilo.id })}>
                      Dodaj u košaricu – {vozilo.cijena},00 €
                    </button>
                    <Link to={`/proizvod/${vozilo.id}`} className='more-btn'>Više informacija</Link>
                  </div>
                  {vozilo.ukratko && (<p><strong>Ukratko:</strong> {vozilo.ukratko}</p>)}
                  {vozilo.pribor && (<p><strong>Pribor:</strong> {vozilo.pribor}</p>)}
                  <p className='tags'><strong>Tag:</strong> <span>{vozilo.tag}</span></p>
                  

                  {isAdmin && (
                    <div style={{justifyContent:'space-between', display:'flex', alignItems:'center'}}>
                      <Link to={`/admin/uredi/${vozilo.id}`} className="slatkis" >Uredi</Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='site-footer'>
        &copy; 2025. Sva prava pridržana.
      </div>
    </div>
  );
};

export default Pocetna;
