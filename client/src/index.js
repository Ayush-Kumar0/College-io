import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthState>
    <App />
  </AuthState>
  // </React.StrictMode>
);
