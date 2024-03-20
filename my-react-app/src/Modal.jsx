import React, { useState } from 'react';

const Modal = ({ show, onClose, onSubmit }) => {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null
  });
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const handleAnswer = (question, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: answer
    }));

    // Verifica si todas las preguntas han sido respondidas
    const answeredQuestionsCount = Object.values({...answers, [question]: answer}).filter(ans => ans !== null).length;
    setAllQuestionsAnswered(answeredQuestionsCount === 4);

    // Llama a la función onSubmit para manejar la respuesta
    onSubmit(question, answer);
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-75 z-50">
        <div className="bg-white p-8 rounded-lg">
          <QuestionButton text="Question 1: Lorem ipsum dolor sit amet?" onAnswer={handleAnswer} question="question1" />
          <QuestionButton text="Question 2: Consectetur adipiscing elit?" onAnswer={handleAnswer} question="question2" />
          <QuestionButton text="Question 3: Sed do eiusmod tempor incididunt?" onAnswer={handleAnswer} question="question3" />
          <QuestionButton text="Question 4: Ut labore et dolore magna aliqua?" onAnswer={handleAnswer} question="question4" />
          {allQuestionsAnswered && (
            <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded transition duration-300">
              Continue
            </button>
          )}
        </div>
      </div>
    )
  );
};

const QuestionButton = ({ text, onAnswer, question }) => {
  const [answered, setAnswered] = useState(false);

  const handleClick = (answer) => {
    onAnswer(question, answer);
    setAnswered(true);
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-lg">{text}</p>
      <div className="flex justify-center">
        <button
          className={`mr-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-600 rounded ${answered && 'opacity-50 cursor-not-allowed'}`}
          onClick={() => handleClick(true)}
          disabled={answered}
        >
          True
        </button>
        <button
          className={`mr-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-600 rounded ${answered && 'opacity-50 cursor-not-allowed'}`}
          onClick={() => handleClick(false)}
          disabled={answered}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default Modal;
