import React from 'react';
import fotodos from '../images/fotodos.png'; 

const HomePage = ({ username, onLogout, onGoToVideoPage }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fotodos})` }}>
      <div className="text-center bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl text-white mb-8 font-bold">Welcome, {username}!</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-4"
        >
          Logout
        </button>
        <button
          onClick={onGoToVideoPage}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Go to Player
        </button>
      </div>
    </div>
  );
};

export default HomePage;
