import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarica, setKosarica] = useState([]);
  const [poruka, setPoruka] = useState('');

  const dodajUKosaricu = (proizvod) => {
    const maxKolicina = proizvod.maxKolicina || 5;

    setKosarica(prev => {
      const postoji = prev.find(p => p.id === proizvod.id);

      if (postoji) {
        if (postoji.kolicina >= maxKolicina) {
          setPoruka(`Ne možete dodati više od ${maxKolicina} komada "${proizvod.name}".`);
          return prev;
        }

        setPoruka(`Dodano još jedan "${proizvod.name}" u košaricu.`);
        return prev.map(p =>
          p.id === proizvod.id ? { ...p, kolicina: p.kolicina + 1 } : p
        );
      } else {
        setPoruka(`Dodano u košaricu: "${proizvod.name}".`);
        return [...prev, { ...proizvod, kolicina: 1 }];
      }
    });
  };

  const ukloniIzKosarice = (id) => {
    setKosarica(prev => prev.filter(p => p.id !== id));
    setPoruka('Proizvod uklonjen iz košarice.');
  };

  const povecajKolicinu = (id) => {
    setKosarica(prev =>
      prev.map(p =>
        p.id === id ? { ...p, kolicina: p.kolicina + 1 } : p
      )
    );
  };

  const smanjiKolicinu = (id) => {
    setKosarica(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, kolicina: p.kolicina > 1 ? p.kolicina - 1 : 1 }
          : p
      )
    );
  };

  const isprazniKosaricu = () => {
    setKosarica([]);
    setPoruka('Košarica je ispražnjena.');
  };

  // Automatski briši poruku nakon 3 sekunde
  useEffect(() => {
    if (poruka) {
      const timer = setTimeout(() => setPoruka(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [poruka]);

  return (
    <CartContext.Provider
      value={{
        kosarica,
        dodajUKosaricu,
        ukloniIzKosarice,
        isprazniKosaricu,
        povecajKolicinu,
        smanjiKolicinu,
        poruka
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
