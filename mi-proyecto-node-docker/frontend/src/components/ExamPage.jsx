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

  const handleBackToHome = () => {
    navigate('/');
  };

  const q = questions[current];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onBackHome={handleBackToHome} />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-gray-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Ensayo de {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </h2>
          <p className="text-lg mb-6">{q.question}</p>
          <ul className="space-y-3">
            {q.options.map((opt, i) => (
              <li key={i}>
                <button
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-300 hover:bg-blue-100 transition"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-6">
            Pregunta {current + 1} de {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
