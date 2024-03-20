import React, { useState } from 'react';
import gatas from '../images/gatas-comic.jpg';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la autenticación, por ejemplo:
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, ingresa un nombre de usuario y contraseña.');
      return;
    }
    onLogin(username);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gatas})` }}>
      <form onSubmit={handleSubmit} className="w-96 p-8 rounded-xl bg-gray-800 bg-opacity-75 shadow-lg">
        <h2 className="text-3xl text-center font-bold text-white mb-6">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
