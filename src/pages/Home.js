import React from "react";
import Header from '../Components/Header';  
import Banner from "../Components/Banner";
import BasicComponent from "../Components/BasicComponent";
import Philosophy from "../Components/Philosophy";
import PhilosophyProgram from "../Components/PhilosophyProgram";
import Director from "../Components/Director";
import StayConnected from "../Components/StayConnected";
import Footer from "../Components/Footer";

const Home = () => {
  const id = "4hURH4J5WPqHSjm3vABwxo";
  console.log("Slug for Home Page:", id);
  return (
    <>
      <Header/>
      <Banner slug={id} />
      {/* <BasicComponent/> */}
      <Philosophy/>
      <PhilosophyProgram/>
      <Director/>
      <StayConnected/>
      <Footer/>
    </>
  );
};

export default Home;
