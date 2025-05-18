import { useState } from 'react';
import './App.css';
import ExamPage from './components/ExamPage';

function App() {
  const [subject, setSubject] = useState(null);

  if (subject) {
    return <ExamPage subject={subject} />;
  }

  return (
    <div className="container">
      <h1>Bienvenido a la Plataforma de Ensayos PAES</h1>
      <p>Selecciona una materia para comenzar tu ensayo:</p>

      <div className="buttons">
        <button onClick={() => setSubject("matematicas")}>Matemáticas</button>
        <button onClick={() => setSubject("lenguaje")}>Lenguaje</button>
        <button onClick={() => setSubject("ciencias")}>Ciencias</button>
      </div>
    </div>
  );
}

export default App;