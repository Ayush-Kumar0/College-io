import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Home, Footer } from './components/home/Home';
import { Signup } from './components/signup/Signup';
import { Signin } from './components/signin/Signin';
import './app.css';



// const [user, setUser] = useState(null);
// const handleLogin = async () => {
//   window.open("https://localhost:8000/auth/google");
// }
function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
