import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from "react-redux";

import store from "./store";

import 'bootstrap/scss/bootstrap.scss';
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// props -> { title: "Hello React", color: "red" }
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <App title="Hello React" color="red" />
        <App title="Hello Next JS" /> */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);