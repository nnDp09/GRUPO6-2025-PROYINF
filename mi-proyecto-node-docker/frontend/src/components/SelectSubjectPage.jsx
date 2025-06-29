import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SelectSubjectPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Header onBackHome={handleBackToHome} />

      <main className="flex-grow px-6 py-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Selecciona una materia</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {/* Matemáticas */}
          <div
            onClick={() => navigate('/examen/matematicas/seleccionar')}
            className="w-full max-w-sm h-60 bg-blue-500 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-blue-600 transition flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Matemáticas</h3>
            <p className="text-center text-sm">Ejercita tu razonamiento lógico y cálculo</p>
          </div>

          {/* Lenguaje */}
          <div
            onClick={() => navigate('/examen/lenguaje')}
            className="w-full max-w-sm h-60 bg-green-400 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-green-500 transition flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Lenguaje</h3>
            <p className="text-center text-sm">Comprensión lectora y análisis de textos</p>
          </div>

          {/* Ciencias */}
          <div
            onClick={() => navigate('/examen/ciencias')}
            className="w-full max-w-sm h-60 bg-purple-400 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-purple-500 transition flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Ciencias</h3>
            <p className="text-center text-sm">Explora biología, física y química</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectSubjectPage;
