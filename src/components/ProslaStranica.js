import React from 'react';
import { useNavigate } from 'react-router-dom';
import './proizvod.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <button className='slatkis' onClick={handleBack}>Prošla stranica</button>
  );
};

export default BackButton;
