import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Typography } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <Typography>
    Estimados clientes y amigos de Puro Sabor,

Queremos informarles que hemos decidido cerrar temporalmente nuestras puertas para buscar un nuevo espacio que nos permita brindar un mejor servicio. Estamos comprometidos con mejorar y expandir nuestras instalaciones para ofrecer una experiencia más acogedora. Continuaremos informándoles sobre cualquier desarrollo a través de nuestras redes sociales y sitio web. Agradecemos su comprensión y apoyo. Esperamos regresar pronto con una experiencia renovada y deliciosa.

Atentamente,
Josue Paniagua/Elías Gomez
Socios comerciales de Puro Sabor
    </Typography>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
