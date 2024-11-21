import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; //per bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; //per le icone di bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; //per le funzionalità interattive di Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
