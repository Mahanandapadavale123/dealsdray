import React, { useState } from 'react';
import Login from './login.jsx';

import EmployeeTable from './EmployeeTable';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <EmployeeTable /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
