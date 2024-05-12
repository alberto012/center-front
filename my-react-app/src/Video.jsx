import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Modal from './Modal';
import VideoSpinner from './tools/Spinner';

const VideoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [lastModalTime, setLastModalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleProgress = ({ playedSeconds }) => {
    const currentSecond = Math.floor(playedSeconds);
    if (currentSecond !== 0 && currentSecond % 10 === 0 && !showModal && currentSecond !== lastModalTime) {
      setShowModal(true);
      setVideoPaused(true);
      setLastModalTime(currentSecond);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoPaused(false);
  };

  const handleSubmitModal = (question, answer) => {
    console.log(`Question ${question} answered with ${answer}`);
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
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
