import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "../App";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

const RouterApp = () => {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default RouterApp;
