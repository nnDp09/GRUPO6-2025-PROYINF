import { useState } from 'react';
import { useParams } from 'react-router-dom';
import questionBank from '../data/questionBank';

function ExamPage() {
  const { subject } = useParams();
  const questions = questionBank[subject] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

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