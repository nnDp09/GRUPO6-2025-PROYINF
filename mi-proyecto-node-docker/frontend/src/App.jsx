// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import SubjectSelector from "./components/SubjectSelector";
import ExamPage from "./components/ExamPage";
import LoginPage from "./pages/loginPage"; 
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/auth";
import { useParams } from 'react-router-dom';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/estudiante" element={
          <PrivateRoute>
            <SubjectSelector />
          </PrivateRoute>
        } />
        <Route path="/profesor" element={
          <PrivateRoute>
            <div>Panel del Profesor (en desarrollo)</div>
          </PrivateRoute>
        } />
        <Route path="/exam/:subject" element={
          <PrivateRoute>
            <ExamPageWrapper />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

function ExamPageWrapper() {
  const { subject } = useParams();
  return <ExamPage subject={subject} />;
}

export default App;