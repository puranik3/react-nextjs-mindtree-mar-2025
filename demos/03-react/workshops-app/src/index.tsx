import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// props -> { title: "Hello React", color: "red" }
root.render(
  <>
    <App title="Hello React" color="red" />
    <App title="Hello Next JS" />
  </>
);