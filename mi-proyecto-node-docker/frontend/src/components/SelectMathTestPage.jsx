// src/components/SelectMathTestPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SelectMathTestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Header onBackHome={() => navigate('/seleccionar')} />
      <main className="flex-grow px-6 py-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Selecciona el tipo de prueba de Matemáticas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* M1 /}
          <div
            onClick={() => navigate('/examen/matematicas-m1')}
            className="w-full max-w-md h-48 bg-sky-500 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-sky-600 transition flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Prueba M1</h3>
            <p className="text-center text-sm">Evaluación general obligatoria</p>
          </div>

          {/ M2 */}
          <div
            onClick={() => navigate('/examen/matematicas-m2')}
            className="w-full max-w-md h-48 bg-indigo-500 text-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-indigo-600 transition flex flex-col justify-center items-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Prueba M2</h3>
            <p className="text-center text-sm">Matemática avanzada, electiva</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectMathTestPage;