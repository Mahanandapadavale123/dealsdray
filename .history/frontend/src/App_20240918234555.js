// src/App.js
import React, { useState } from 'react';
import Login from './login.js';
import EmployeeTable from './EmployeeTable.js';



const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      {token ? <EmployeeTable /> : <Login setToken={setToken} />}
    </div>
  );
};

export default App;
