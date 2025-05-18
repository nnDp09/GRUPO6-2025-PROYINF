import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Sistema de Ensayos PAES</h1>
      <p>Prepárate para la PAES con ensayos prácticos</p>
      <button onClick={() => navigate('/estudiante')}>Realizar Ensayo</button>
      <button onClick={() => navigate('/profesor')} style={{ marginLeft: '10px' }}>Soy Profesor</button>
    </div>
  );
}

export default HomePage;