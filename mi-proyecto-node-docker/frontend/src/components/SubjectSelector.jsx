import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubjectSelector() {
  const navigate = useNavigate();

  const handleSelect = (subject) => {
    navigate(`/exam/${subject}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h2>Selecciona una materia para comenzar</h2>
      <button onClick={() => handleSelect('matematicas')}>Matemáticas</button>
      <button onClick={() => handleSelect('lenguaje')}>Lenguaje</button>
      <button onClick={() => handleSelect('ciencias')}>Ciencias</button>
    </div>
  );
}
