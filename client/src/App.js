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

import DashboardPage from './components/dashboard/DashboardPage';
import Dashboard from "./components/dashboard/pages/dashboard";
import Team from "./components/dashboard/pages/team";
import Invoices from "./components/dashboard/pages/invoices";
import Contacts from "./components/dashboard/pages/contacts";
import Form from "./components/dashboard/pages/form";
import Calendar from "./components/dashboard/pages/calendar";
import Bar from "./components/dashboard/pages/bar";
import Line from "./components/dashboard/pages/line";
import Pie from "./components/dashboard/pages/pie";
import FAQ from "./components/dashboard/pages/faq";
import Geography from "./components/dashboard/pages/geography";


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
        <Route path='/' element={<><Navbar page="Home" /><Home /></>} />
        {
          !login ? <>
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
          </>
            : <>
              <Route path='feed' element={<Feed />} />
              <Route path='dashboard' element={<DashboardPage />} >
                <Route index element={<Dashboard />} />
                <Route path="team" element={<Team />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="form" element={<Form />} />
                <Route path="bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="geography" element={<Geography />} />
              </Route>
            </>
        }
        <Route path='*' element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
