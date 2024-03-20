import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from './Modal';
import ProgressBar from './Progreso'; // Importamos el componente ProgressBar
import futuro from '../images/futuro.jfif';

const VideoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [answered, setAnswered] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false
  });
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [lastModalTime, setLastModalTime] = useState(0);

  useEffect(() => {
    if (showModal) {
      setVideoPaused(true);
    }
  }, [showModal]);

  const handleProgress = ({ playedSeconds }) => {
    const currentSecond = Math.floor(playedSeconds);
    if (currentSecond !== 0 && currentSecond % 10 === 0 && !showModal && currentSecond !== lastModalTime) {
      setShowModal(true);
      setVideoPaused(true);
      setLastModalTime(currentSecond);
    }
  };

  const handleCloseModal = (isTrue) => {
    setShowModal(false);
    const question = isTrue ? 'question1' : 'question2';
    setAnswered(prevState => ({
      ...prevState,
      [question]: true
    }));
    setVideoPaused(false);
  };

  const handleSubmitModal = (question, answer) => {
    // Aquí puedes manejar la lógica para enviar la respuesta a tu backend, por ejemplo:
    console.log(`Question ${question} answered with ${answer}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl text-white mb-8 font-bold">This is the Video Page!</h1>
        <div className="mb-8">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            controls
            onProgress={handleProgress}
            onPlay={() => setVideoStarted(true)}
            playing={!videoPaused}
            width="1040px"
            height="640px"
            style={{ border: '1px solid #4a4a4a', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', filter: videoStarted ? 'none' : 'brightness(0.5)' }}
          />
          {/* <ProgressBar totalQuestions={4} answered={answered} /> */}
        </div>
        <p className="text-lg text-gray-400">Here you can add your video content.</p>
        <Modal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
      </div>
    </div>
  );
};

export default VideoPage;
