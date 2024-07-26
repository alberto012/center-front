import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from './Modals/Modal';
import VideoSpinner from './Spinner';
import Memo from '../Memo';
import { useNavigate, useLocation } from 'react-router-dom';

const VideoPage = ({ onUpdateUser }) => {
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
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { episode } = location.state || {};

  useEffect(() => {
    if (showModal) {
      setVideoPaused(true);
    }
  }, [showModal]);

  const handleProgress = ({ playedSeconds }) => {
    const currentSecond = Math.floor(playedSeconds);
    if (currentSecond !== 0 && currentSecond === 60 && !showGame && currentSecond !== lastMemoTime) {
      setShowGame(true);
      setVideoPaused(true);
      setLastMemoTime(currentSecond);
    }

    if (currentSecond !== 0 && currentSecond === 30 && !showModal && currentSecond !== lastModalTime) {
      setShowModal(true);
      setVideoPaused(true);
      setLastModalTime(currentSecond);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoPaused(false);
  };

  const handleCloseMemo = (isTrue) => {
    setShowGame(false);
    setVideoPaused(false);
  };

  const handleSubmitModal = (question, answer) => {
    console.log(`Question ${question} answered with ${answer}`);
  };

  const handleSubmitMemo = (question, answer) => {
    console.log(`Question ${question} answered with ${answer}`);
  };

  const handleVideoEnd = () => {
    if (episode) {
      onUpdateUser(episode);
    }
    navigate('/resume');
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {isLoading ? (
        <VideoSpinner />
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="text-center">
            <h1 className="text-4xl text-white mb-8 font-bold">This is the Video Page!</h1>
            <div className="mb-8">
              <ReactPlayer
                url={episode ? `path/to/videos/${episode.title}.mp4` : ''} 
                playing={!videoPaused}
                width="100%"
                height="100%"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                }}
                onProgress={handleProgress}
                onPlay={() => setVideoStarted(true)}
                onEnded={handleVideoEnd}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                    },
                  },
                }}
              />
            </div>
            <p className="text-lg text-gray-400">Here you can add your video content.</p>
            <Modal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
            <Memo show={showGame} onClose={handleCloseMemo} onSubmit={handleSubmitMemo} />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
