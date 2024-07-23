// App.jsx
import React, { useReducer, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/Home';
import VideoPage from './components/Video';
import ResumePage from './components/Resume';
import MyCompanyPage from './components/MyCompany';
import LoginPage from './components/Login';
import Spinner from './components/Spinner'; // Asegúrate de tener este componente

const mockUsers = [
  {
    username: 'user1',
    password: '123',
    st: true
  },
  {
    username: 'user2',
    password: '123',
    st: false
  }
];

const initialState = {
  user: null,
  isLoading: true,
  userHasSt: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        userHasSt: action.payload.st,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        userHasSt: false,
        isLoading: false,
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
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user) => {
    const foundUser = mockUsers.find(u => u.username === user.username && u.password === user.password);

    if (foundUser) {
      dispatch({ type: 'LOGIN', payload: foundUser });
      navigate('/home');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const { user, isLoading, userHasSt } = state;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={
              <HomePage
                username={user?.username}
                onLogout={handleLogout}
                onGoToVideoPage={() => navigate('/video')}
                st={userHasSt}
                onGoToResumePage={() => navigate('/resume')}
                onGoToMyCompanyPage={() => navigate('/myCompany')}
              />
            }
          />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/myCompany" element={<MyCompanyPage />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
