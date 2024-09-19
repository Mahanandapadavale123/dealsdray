import React from 'react';
import Login from './login'; // Adjust the path if needed

function App() {
  const handleToken = (token) => {
    // Handle the token (e.g., save it to state or localStorage)
  };

  return (
    <div className="App">
      <Login setToken={handleToken} />
    </div>
  );
}

export default App;