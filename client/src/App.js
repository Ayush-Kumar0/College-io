import { React, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';

// Authentication and Sockets
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import io from 'socket.io-client';
import socketInit from './sockets';

// Components
import { Navbar } from './components/navbar/Navbar';
import { Home, Footer } from './components/home/Home';
import { Signup } from './components/signup/Signup';
import { Signin } from './components/signin/Signin';
import Feed from './components/feed/Feed';


function App() {
  const [login, setLogin, socket] = useContext(AuthContext);
  useEffect(() => {
    if (login) {
      socketInit(socket);
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Navbar /><Home /></>} />
        {
          !login ? <>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </>
            : <Route path='/feed' element={<Feed />} />
        }
        <Route path='*' element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
