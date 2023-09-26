import React from 'react';
import Layout from "../Components/layout";
import Home from "./Home";
import './dist/aos.css';
import "../Components/style.css";
import Seo from "../Components/seo";


const IndexPage = () => (

  <Layout>
    <Home />
  </Layout>
);

export const Head = () => {
  return (
    <>
      <Seo title="Home" />
    </>
  );
};

export default IndexPage;

