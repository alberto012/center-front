import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from './Modal';
import ProgressBar from './Progreso'; // Importamos el componente ProgressBar
import futuro from '../images/futuro.jfif';
import Memo from './Memo';

const VideoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [answered, setAnswered] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false
  });
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [lastModalTime, setLastModalTime] = useState(0);
  const [lastMemoTime, setLastMemoTime] = useState(0);

  useEffect(() => {
    if (showModal) {
      setVideoPaused(true);
    }
  }, [showModal]);

  const handleProgress = ({ playedSeconds }) => {
    const currentSecond = Math.floor(playedSeconds);
    if (currentSecond !== 0 && currentSecond === 60 && !showGame && currentSecond !== lastMemoTime) {
      //setShowModal(true);
      setShowGame(true);
      setVideoPaused(true);
      setLastMemoTime(currentSecond);
    }

    if (currentSecond !== 0 && currentSecond === 30 && !showModal && currentSecond !== lastModalTime) {
      setShowModal(true);
      //setShowGame(true);
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

  const handleCloseMemo = (isTrue) => {
    setShowGame(false);
    setVideoPaused(false);
  };

  const handleSubmitModal = (question, answer) => {
    // Aquí puedes manejar la lógica para enviar la respuesta a tu backend, por ejemplo:
    console.log(`Question ${question} answered with ${answer}`);
  };

  const handleSubmitMemo = (question, answer) => {
    // Aquí puedes manejar la lógica para enviar la respuesta a tu backend, por ejemplo:
    console.log(`Question ${question} answered with ${answer}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl text-white mb-8 font-bold">This is the Player!</h1>
        <div className="mb-8">
          <ReactPlayer
            url="https://youtu.be/TL2I1dy10I0?si=l6HO1hQQlQuQsM-F"
            controls={false}
            onProgress={handleProgress}
            onPlay={() => setVideoStarted(true)}
            playing={!videoPaused}
            width='100%'
            height='100%'
            style={{ border: '1px solid #4a4a4a', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', filter: videoStarted ? 'none' : 'brightness(0.5)' }}
          />
          {/* <ProgressBar totalQuestions={4} answered={answered} /> */}
        </div>
        <p className="text-lg text-gray-400">Here you can add your video content.</p>
        <Modal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
        <Memo show={showGame} onClose={handleCloseMemo} onSubmit={handleSubmitMemo}/>
      </div>
    </div>
  );
};

export default VideoPage;
