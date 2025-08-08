// components/CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [kosarica, setKosarica] = useState([]);

  const dodajUKosaricu = (proizvod) => {
    setKosarica(prev => [...prev, proizvod]);
  };

  const ukloniIzKosarice = (id) => {
    setKosarica(prev => prev.filter(p => p.id !== id));
  };

  const isprazniKosaricu = () => {
    setKosarica([]);
  };

  return (
    <CartContext.Provider value={{ kosarica, dodajUKosaricu, ukloniIzKosarice, isprazniKosaricu }}>
      {children}
    </CartContext.Provider>
  );
};
