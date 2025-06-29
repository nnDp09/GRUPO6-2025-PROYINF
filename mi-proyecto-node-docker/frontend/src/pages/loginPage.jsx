import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Header from '../components/Header'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    // tu lógica de login exitosa aquí
  };

  const handleError = () => {
    alert('Login failed');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Header onBackHome={handleBackToHome} />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">
            Iniciar sesión con Google
          </h1>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </main>
    </div>
  );
}
