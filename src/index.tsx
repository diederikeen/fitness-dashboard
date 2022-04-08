import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import reportWebVitals from "./reportWebVitals";

import { App } from "./pages/App";

import { authApi } from "./common/utils/api";

// Set container
// We have to use as HTMLElement here in order to prevent a null assertion
// as we're certain root will exist.
const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);

// Render the app
root.render(
  <ApiProvider api={authApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
