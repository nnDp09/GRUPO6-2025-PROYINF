import { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuestionBuilder() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [statement, setStatement] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/subjects');
      console.log("Materias:", res.data); // 👈 Verifica aquí qué trae
      setSubjects(res.data);
    } catch (e) {
      setError('No se pudieron cargar las materias');
    }
    setLoading(false);
  };

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;  // Evitar crear materia vacía

    try {
      // Crear nueva materia en backend
      await axios.post('/api/subjects', { name: newSubject.trim() });

      // Limpiar input de nueva materia
      setNewSubject('');

      // Obtener lista actualizada de materias
      const res = await axios.get('/api/subjects');
      setSubjects(res.data);

      // Seleccionar automáticamente la nueva materia creada
      setSelectedSubject(newSubject.trim());

    } catch (error) {
      alert('Error al crear materia');
    }
  };


  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleOptionChange = (i, value) => {
    const newOptions = [...options];
    newOptions[i].text = value;
    setOptions(newOptions);
  };

  const handleSelectCorrect = (i) => {
    const newOptions = options.map((opt, idx) => ({ ...opt, isCorrect: idx === i }));
    setOptions(newOptions);
  };

  const handleSave = async () => {
    if (!selectedSubject) return alert('Selecciona una materia');

    await axios.post(`/api/questions/${selectedSubject}`, {
      name: questionName,
      difficulty,
      statement,
      options,
    });

    alert('Pregunta guardada con éxito');
  };



  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Pregunta</h2>

      <label className="block mb-2">Selecciona materia:</label>
      <select
        className="border p-2 w-full mb-2"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">-- Elige --</option>
        {subjects.map((s, i) => (
          <option key={i} value={s.name}>{s.name}</option>
        ))}
      </select>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Nueva materia"
          className="border p-2 flex-1"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={handleAddSubject} className="ml-2 bg-blue-500 text-white px-4">Crear</button>
      </div>

      <label className="block mb-2">Dificultad:</label>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <label className="block mb-2">Nombre de la pregunta:</label>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={questionName}
        onChange={(e) => setQuestionName(e.target.value)}
      />

      <label className="block mb-2">Enunciado:</label>
      <textarea
        className="border p-2 w-full mb-4"
        rows={4}
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
      />

      <label className="block mb-2">Alternativas:</label>
      {options.map((opt, i) => (
        <div key={i} className="flex items-center mb-2">
          <input
            type="radio"
            name="correctOption"
            checked={opt.isCorrect}
            onChange={() => handleSelectCorrect(i)}
            className="mr-2"
          />
          <input
            type="text"
            className="border p-2 w-full"
            value={opt.text}
            onChange={(e) => handleOptionChange(i, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddOption} className="bg-green-500 text-white px-4 py-1 mt-2">Agregar alternativa</button>

      <button
        onClick={handleSave}
        className="block bg-blue-600 text-white px-6 py-2 mt-6 rounded"
      >
        Guardar Pregunta
      </button>
    </div>
  );
}
