// src/App.jsx
import React, { useEffect, useReducer } from 'react';
import LoginPage from './Login';
import HomePage from './Home';
import VideoPage from './Video';
import Spinner from './tools/Spinner';
import ResumePage from './Resume';
import MyCompanyPage from './MyCompany';

const initialState = {
  user: null,
  currentPage: 'login',
  isLoading: true,
  userHasSt: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.username,
        userHasSt: action.payload.st,
        currentPage: 'home',
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        userHasSt: false,
        currentPage: 'login',
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username, st) => {
    dispatch({ type: 'LOGIN', payload: { username, st } });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const { user, currentPage, isLoading, userHasSt } = state;

  const pageComponents = {
    login: <LoginPage onLogin={handleLogin} />,
    home: (
      <HomePage
        username={user}
        onLogout={handleLogout}
        onGoToVideoPage={() => handlePageChange('video')}
        st={userHasSt}
        onGoToResumePage={() => handlePageChange('resume')}
        onGoToMyCompanyPage={() => handlePageChange('myCompany')}
      />
    ),
    video: <VideoPage />,
    resume: <ResumePage />,
    myCompany: <MyCompanyPage />,
  };

  return <div>{isLoading ? <Spinner /> : pageComponents[currentPage]}</div>;
};

export default App;
