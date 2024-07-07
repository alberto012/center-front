// src/App.js
import React, { useEffect, useState } from 'react';
import LoginPage from './Login';
import HomePage from './Home';
import VideoPage from './Video';
import Spinner from './tools/Spinner';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoading, setIsLoading] = useState(true);
  const [userHasSt, setUserHasSt] = useState(false);

  const handleLogin = (username, st) => {
    setUser(username);
    setUserHasSt(st);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setUserHasSt(false);
    setCurrentPage('login');
  };

  const handleGoToVideoPage = () => {
    setCurrentPage('video');
  };

  let content;
  if (currentPage === 'login') {
    content = <LoginPage onLogin={handleLogin} />;
  } else if (currentPage === 'home') {
    content = (
      <HomePage
        username={user}
        onLogout={handleLogout}
        onGoToVideoPage={handleGoToVideoPage}
        st={userHasSt}
      />
    );
  } else if (currentPage === 'video') {
    content = <VideoPage />;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return <div>{isLoading ? <Spinner /> : content}</div>;
};

export default App;
