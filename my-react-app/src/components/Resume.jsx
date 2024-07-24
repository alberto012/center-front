import React, { useState, useEffect, useReducer } from 'react';
import { CiPlay1 } from "react-icons/ci";
import { GoTools } from "react-icons/go";
import backgroundImage from '../assets/fondoBotton.png';
import { useNavigate } from 'react-router-dom';

// Define action types
const LOGOUT = 'LOGOUT';

// Define the initial state
const initialState = {
  isAuthenticated: true, // Set this according to your initial auth state
};

// Define a reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const ResumePage = ({ user }) => {
  const [episodes, setEpisodes] = useState([]);
  const [lastReproduced, setLastReproduced] = useState('');
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      const { reproducedChapters = [], notReproducedChapters = [] } = user;
      const allEpisodes = [...reproducedChapters, ...notReproducedChapters];
      setEpisodes(allEpisodes);

      if (reproducedChapters.length > 0) {
        setLastReproduced(reproducedChapters[reproducedChapters.length - 1].title);
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-4 py-12 text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Resume Page</h1>
        <p className="text-2xl mb-8">Description:</p>
        <p className="text-lg mb-12">Welcome, {user?.username || 'User'}! Here is your resume.</p>
        <div className="flex justify-center items-center mb-8">
          <button className="mr-4 bg-gradient-to-b from-blue-700 to-blue-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center">
            <CiPlay1 className="inline-block mr-2" /> Play {lastReproduced && `- ${lastReproduced}`}
          </button>
          <button className="mr-4 text-white font-bold py-2 px-2 transform rounded-full shadow-md border flex items-center" onClick={handleLogout}>
            <GoTools />
          </button>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.length > 0 ? (
            episodes.map((episode, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
                <img src={episode.image} alt={episode.title} className="w-full h-32 object-cover mb-2 rounded-lg" />
                <p className="text-lg font-bold mb-2">{episode.title}</p>
                <p className="text-sm">{episode.description}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No episodes to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
