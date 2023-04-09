import { React, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Home, Footer } from './components/home/Home';
import { Signup } from './components/signup/Signup';
import { Signin } from './components/signin/Signin';
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import './app.css';


function App() {
  const [login, setLogin] = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Navbar /><Home /></>} />
        {
          !login ? <>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </>
            : <Route path='/feed' element={<h1>Feed</h1>} />
        }
        <Route path='*' element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
