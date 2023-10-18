// About.js
import React from "react";
import Header from '../Components/Header';  
import Banner from "../Components/Banner";
import BasicComponent from "../Components/BasicComponent";
import Philosophy from "../Components/Philosophy";
import PhilosophyProgram from "../Components/PhilosophyProgram";
import Director from "../Components/Director";
import StayConnected from "../Components/StayConnected";
import Footer from "../Components/Footer";


const AboutUs = () => {
  const slug = "about-page-banner"; // Set the slug for the about page banner
  console.log("Slug for About Page:", slug);
  return (
    <>
      <Header />
      <Banner slug={slug} />
      <BasicComponent/>
      <Philosophy/>
      <PhilosophyProgram/>
      <Director/>
      <StayConnected/>
      <Footer/>
      {/* Other content */}
      {/* Other content */}
      {/* <h1>About page</h1> */}
    </>
  );
};

export default AboutUs;
