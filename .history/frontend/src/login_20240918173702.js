// src/login.js (Login Component)
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { userName, password });
      setToken(response.data.token);
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>User Name</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
