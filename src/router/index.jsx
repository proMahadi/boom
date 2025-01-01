import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import { HelmetProvider } from "react-helmet-async";

const RouterApp = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default RouterApp;
