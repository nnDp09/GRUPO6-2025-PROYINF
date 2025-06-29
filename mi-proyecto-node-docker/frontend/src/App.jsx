// src/App.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import HomePage from "./components/HomePage";
import SubjectSelector from "./components/SelectSubjectPage";
import ExamPage from "./components/ExamPage";
import LoginPage from "./pages/loginPage"; // Asegúrate que el archivo y carpeta usen mayúscula L
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/estudiante"
          element={
            <PrivateRoute>
              <SubjectSelector />
            </PrivateRoute>
          }
        />

        <Route
          path="/profesor"
          element={
            <PrivateRoute>
              <div>Panel del Profesor (en desarrollo)</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/exam/:subject"
          element={
            <PrivateRoute>
              <ExamPageWrapper />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

// Wrapper para obtener params y pasar a ExamPage
function ExamPageWrapper() {
  const { subject } = useParams();
  return <ExamPage subject={subject} />;
}

export default App;
