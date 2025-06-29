import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ onBackHome }) {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white text-gray-900 py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div
          onClick={onBackHome}
          className="cursor-pointer flex items-center gap-2"
        >
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">Ensayos PAES</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 transition"
          >
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
