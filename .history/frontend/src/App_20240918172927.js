// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      {token ? <EmployeeTable /> : <Login setToken={setToken} />}
    </div>
  );
};

export default App;
