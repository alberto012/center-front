// src/components/HomePage.jsx
import React from 'react';
import fotodos from './assets/FondoGeneral.png';
import { CiPlay1 } from "react-icons/ci";

const HomePage = ({ username, onLogout, onGoToVideoPage, onGoToResumePage, onGoToMyCompanyPage, st }) => {
  const buttonConfig = st
    ? [
        {
          onClick: onGoToResumePage,
          text: 'Resume',
          colors: 'from-blue-700 to-blue-400',
        },
        {
          onClick: onGoToMyCompanyPage,
          text: 'My Company',
          colors: 'from-blue-700 to-red-400',
        },
      ]
    : [
        {
          onClick: onGoToVideoPage,
          text: 'Go to Player',
          colors: 'from-blue-700 to-blue-400',
        },
        {
         
          onClick: onLogout,
          text: 'Logout',
          colors: 'from-blue-700 to-red-400',
        },
      ];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fotodos})` }}>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto bg-gray-900 bg-opacity-60 p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl text-white mb-8 font-bold">Welcome, {username}!</h1>
          <p className="text-white mb-1 font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusantium quod cum?</p>
          <div className="flex justify-end mt-4">
            {buttonConfig.map(({ onClick, text, colors }, index) => (
              <button
                key={index}
                className={`mr-4 bg-gradient-to-b ${colors} text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center`}
                onClick={onClick}
              >
                <CiPlay1 className="mr-2" /> {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
