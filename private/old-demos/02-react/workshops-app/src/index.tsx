import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";

/* Importing Bootstrap SCSS file. */
import "bootstrap/scss/bootstrap.scss";

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/* BrowserRouter makes sure the App component re-renders when the URL changes */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
