import React from "react";
import { Link } from "react-router-dom";

const Pocetna = ({ prodaja, selectedTag, setSelectedTag }) => {
  return (
    <div class="page-layout">
      <div class="cigla-wrap">
        <div className='main-content'>
          <h1>Vozila na prodaju</h1><br/>
          <div className="filters">
            <button className={selectedTag === "svi" ? "active" : ""} onClick={() => setSelectedTag("svi")}>Sve</button>
            <button className={selectedTag === "eRomobil" ? "active" : ""} onClick={() => setSelectedTag("eRomobil")}>E-romobil</button>
            <button className={selectedTag === "eBajk" ? "active" : ""} onClick={() => setSelectedTag("eBajk")}>E-bike</button>
            <button className={selectedTag === "eScooter" ? "active" : ""} onClick={() => setSelectedTag("eScooter")}>E-skuter</button>
            <button className={selectedTag === "dodatnaOprema" ? "active" : ""} onClick={() => setSelectedTag("dodatnaOprema")}>Kacige i dodatna oprema</button>
          </div>
          <div className='card-grid'>
            {prodaja.map((vozilo) => (
              <div key={vozilo.id} className='card'>
                <h2>{vozilo.name}</h2>
                {vozilo.slika && (<img src={vozilo.slika} alt={vozilo.name || "Slika proizvoda"} />)}
                {vozilo.ukratko && (<p><strong>Ukratko:</strong> {vozilo.ukratko}</p>)}
               {vozilo.pribor && (<p><strong>Pribor:</strong> {vozilo.pribor}</p>)}
                <p className='tags'><strong>Tag:</strong> <span>{vozilo.tag}</span></p><br/><br/><br/>
                <p className='cijena'>{vozilo.cijena} €</p>
                <Link to={`/proizvod/${vozilo.id}`} className='more-btn'>Više informacija</Link>
              </div>
            ))}
          </div>
          <br />
        </div>
      </div>
          <div className='site-footer'>
            &copy; 2025. Sva prava pridržana.
          </div>
    </div>
  );
};

export default Pocetna;
