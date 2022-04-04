import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import { App } from "./pages/App";

const container = document.getElementById('root');

// We have to use as HTMLElement here in order to prevent a null assertion
// as we're certain root will exist.
const root =  ReactDOMClient.createRoot(container as HTMLElement);

// Render the app
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
