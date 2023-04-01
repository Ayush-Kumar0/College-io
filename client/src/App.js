import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Login } from './components/Login';



// const [user, setUser] = useState(null);
// const handleLogin = async () => {
//   window.open("https://localhost:8000/auth/google");
// }
function App() {
  const [login, setLogin] = useState(() => false);

  const handleLogin = (event) => {
    setLogin(true);
  }

  return (
    <>
      <BrowserRouter>
        <button onClick={handleLogin} className="bg-blue-600 rounded-md p-6">Login</button>
        {login ? <Login /> : null}
      </BrowserRouter>
    </>
  );
}

export default App;
