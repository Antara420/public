// components/Kosarica.js
import {React, useState }from 'react';
import { useCart } from './CartContext';
import './kosara.css';


const Kosarica = () => {
  const { kosarica, ukloniIzKosarice, isprazniKosaricu } = useCart();
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  

if (kosarica.length === 0) return (
  <div class="page-layout">
    <div class="page-layout">
      <div style={{ backgroundColor: 'white', fontSize:32, color: 'black', padding: '200px', textAlign: 'center', minHeight: '400px' }}>
        <p>Košarica je prazna.</p>
      
      </div>
      <div className='site-footer'>
          &copy; 2025 Sva prava pridržana
        </div>
    </div>
  </div>
  );


  const handleSubmit = (e) => {
  e.preventDefault();
  alert("Hvala na kupnji! Vaša narudžba je zaprimljena.");
  setPrikaziFormu(false);
  isprazniKosaricu();
};

  return (
    <div className='page-layout'>
      <div class="cigla-wrap">
        <h1>Vaša košarica</h1>
          <div class="ciglica">
              <div class="kosara" >
                
                  <div class="leefi" >
                        <ul >
                          {kosarica.map((p, index) => (
                          <li key={index}>
                              <img src={p.slika} alt={p.name} />
                              <div className="item-info">
                              <strong>{p.name}</strong>
                              <span>{p.cijena} €</span>
                              <button onClick={() => ukloniIzKosarice(p.id)}>Ukloni</button>
                              </div>
                          </li>))}
                        </ul>
                  </div>
                  <div class="desni22">
                    <button onClick={isprazniKosaricu}>Isprazni košaricu</button><br/><br/><br/>
                    <button onClick={() => setPrikaziFormu(true)}>Plaćanje</button>
              
                    {prikaziFormu && (
                       <div className="modal">
                          <div className="modal-content">
                            <span className="close" onClick={() => setPrikaziFormu(false)}>&times;</span>
                            <h3>Unesite podatke za plaćanje</h3>
                            <form onSubmit={handleSubmit}>
                              <label>Ime i prezime:</label>
                              <input type="text" required />
              
                              <label>Adresa:</label>
                              <input type="text" required />
              
                              <label>Grad:</label>
                              <input type="text" required />
              
                              <label>Poštanski broj:</label>
                              <input type="text" required />
              
                              <label>Način plaćanja:</label>
                              <select required>
                               <option value="">Odaberi</option>
                               <option value="kartica">Kartica</option>
                               <option value="pouzeće">Pouzeće</option>
                             </select>
              
                            <button type="submit">Potvrdi plaćanje</button>
                           </form>
                  </div>
                </div>
              )}
                  </div>
            </div>
          </div>
    </div>

      <div className='site-footer'>
              &copy; 2025
      </div>
    </div>
  );
};

export default Kosarica;
