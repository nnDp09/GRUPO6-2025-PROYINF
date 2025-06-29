import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleBackToHome = () => navigate('/');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Header
        onBackHome={handleBackToHome}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">
            Bienvenido a la Plataforma de Ensayos PAES
          </h1>
          <button
            onClick={() => navigate('/seleccionar')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-medium transition shadow-lg"
          >
            Realizar ensayo
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
