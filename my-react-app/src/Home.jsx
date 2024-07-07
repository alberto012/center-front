// src/components/HomePage.jsx
import React, { useState } from 'react';
import fotodos from '../images/fotodos.png';
import { CiPlay1 } from "react-icons/ci";
import ResumePage from './Resume';
import MyCompanyPage from './MyCompany';

const HomePage = ({ username, onLogout, onGoToVideoPage, st }) => {
  const [showResume, setShowResume] = useState(false);
  const [showMyCompany, setShowMyCompany] = useState(false);

  const handleResumeClick = () => {
    setShowResume(true);
    setShowMyCompany(false);
  };

  const handleMyCompanyClick = () => {
    setShowMyCompany(true);
    setShowResume(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fotodos})` }}>
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto bg-gray-900 bg-opacity-60 p-8 rounded-lg shadow-xl">
            <h1 className="text-4xl text-white mb-8 font-bold">Welcome, {username}!</h1>
            <p className="text-white mb-1 font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente accusantium quod cum?</p>
            <div className="flex justify-end mt-4">
              {st ? (
                <>
                  <button
                    className="mr-4 bg-gradient-to-b from-blue-700 to-blue-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center"
                    onClick={handleResumeClick}
                  >
                    <CiPlay1 className="mr-2" /> Resume
                  </button>
                  <button
                    className="bg-gradient-to-b from-blue-700 to-red-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center"
                    onClick={handleMyCompanyClick}
                  >
                    My Company
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mr-4 bg-gradient-to-b from-blue-700 to-blue-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center"
                    onClick={onGoToVideoPage}
                  >
                    <CiPlay1 className="mr-2" /> Go to Player
                  </button>
                  <button
                    className="bg-gradient-to-b from-blue-700 to-red-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Renderizado condicional de los componentes */}
      {showResume && <ResumePage />}
      {showMyCompany && <MyCompanyPage />}
    </>
  );
};

export default HomePage;
