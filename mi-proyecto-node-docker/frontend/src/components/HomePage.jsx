import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth'; // Asegúrate de que la ruta sea correcta

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Se extrae la función logout del contexto

  const handleLogout = () => {
    logout();          // Limpia los datos del usuario
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5vh' }}>
      {user && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 30,
            textAlign: 'right',
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '5px' }}>
            Bienvenido, {user.name}
          </div>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
      <h1>Sistema de Ensayos PAES</h1>
      <p>Prepárate para la PAES con ensayos prácticos</p>
      <button onClick={() => navigate('/estudiante')}>Realizar Ensayo</button>
    </div>
  );
}
