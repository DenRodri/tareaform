import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*Otro componente con 3 opciones:
Las dos primeras son inputs
3ero sera boton

1. Fill up the form of sendinfo, to make it controlled if certain stuff is empt b the time u send shit u do not
send shit

2. Onsubmit, clean state, and fill it like a json file and send it to app.js to send it to Input.js

Name input
Plus sign and X sign for adding and deleting new options for dropdown and radio

PON BOTON TAMBIEN COMO LOS DEMAS NO ES FIJO*/