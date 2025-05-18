import { useState } from 'react';

const questionBank = {
  matematicas: [
    {
      question: "¿Cuánto es 7 x 6?",
      options: ["42", "36", "48", "56"],
      correct: 0
    },
    {
      question: "¿Qué número sigue en la secuencia: 2, 4, 8, 16, ...?",
      options: ["20", "24", "32", "30"],
      correct: 2
    }
  ],
  lenguaje: [
    {
      question: "¿Cuál es el sinónimo de 'feliz'?",
      options: ["Triste", "Contento", "Enojado", "Solo"],
      correct: 1
    },
    {
      question: "¿Qué tipo de palabra es 'rápidamente'?",
      options: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
      correct: 3
    }
  ],
  ciencias: [
    {
      question: "¿Cuál es el planeta más cercano al sol?",
      options: ["Venus", "Marte", "Mercurio", "Júpiter"],
      correct: 2
    },
    {
      question: "¿Qué gas respiramos para vivir?",
      options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
      correct: 0
    }
  ]
};

function ExamPage({ subject }) {
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

  return (
    <div>
      <h2>Ensayo de {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
      <p>{q.question}</p>
      <ul>
        {q.options.map((opt, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(i)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamPage;