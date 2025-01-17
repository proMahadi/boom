import React from "react";
import { Helmet } from "react-helmet-async";
import LineChart from "../components/Line";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>this is home page</title>
      </Helmet>
       <LineChart/>
    </>
  );
};

export default Home;
