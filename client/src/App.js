import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    window.open("https://localhost:8000/auth/google");
  }

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  }

  const handleProfile = async () => {
    const { data } = await axios.get('/api/profile');
    setUser(data);
  }

  return (
    <div>
      <h1>G Suite Login Example</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <p>Organization: {user.orgName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with G Suite</button>
      )}
      {user && <button onClick={handleProfile}>Get Profile</button>}
    </div>
  );
}

export default App;
