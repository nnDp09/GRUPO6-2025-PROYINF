import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionBank from '../data/questionBank';

function ExamPage() {
  const { subject } = useParams();
  const questions = questionBank[subject] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(8400); // 10 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("¡Se acabó el tiempo!");
          // Aquí puedes redirigir o guardar resultados
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // limpieza al desmontar
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = (index) => {
    setAnswers([...answers, index]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("¡Ensayo finalizado!");
    }
  };

  const q = questions[current];

  if (!q) return <p>Materia no encontrada.</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Ensayo de {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
      <p><strong>Tiempo restante:</strong> {formatTime(timeLeft)}</p>
      <p>{q.question}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {q.options.map((opt, i) => (
          <li key={i} style={{ margin: '10px' }}>
            <button onClick={() => handleAnswer(i)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamPage;