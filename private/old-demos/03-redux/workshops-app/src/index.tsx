import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./store";

/* Importing Bootstrap SCSS file. */
import "bootstrap/scss/bootstrap.scss";

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* BrowserRouter makes sure the App component re-renders when the URL changes */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
