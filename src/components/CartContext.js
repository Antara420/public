import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarica, setKosarica] = useState([]);

  const dodajUKosaricu = (proizvod) => {
    setKosarica(prev => {
      const postoji = prev.find(p => p.id === proizvod.id);
      if (postoji) {
        return prev.map(p => 
          p.id === proizvod.id ? { ...p, kolicina: p.kolicina + 1 } : p
        );
      } else {
        return [...prev, { ...proizvod, kolicina: 1 }];
      }
    });
  };

  const ukloniIzKosarice = (id) => {
    setKosarica(prev => prev.filter(p => p.id !== id));
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
  };

  return (
    <CartContext.Provider
      value={{
        kosarica,
        dodajUKosaricu,
        ukloniIzKosarice,
        isprazniKosaricu,
        povecajKolicinu,
        smanjiKolicinu
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
