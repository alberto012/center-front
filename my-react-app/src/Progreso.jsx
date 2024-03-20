import React from 'react';

const ProgressBar = ({ totalQuestions, answered }) => {
  // Calculamos el progreso en base a las preguntas respondidas correctamente
  const progress = Object.values(answered).filter(answer => answer).length / totalQuestions * 100;

  return (
    <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-300">
      <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
