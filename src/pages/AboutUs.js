// About.js
import React from "react";
import Header from '../Components/Header';  
import Banner from "../Components/Banner";


const AboutUs = () => {
  const id = "6STR6Eve39x5dXFgKBIObZ"; // Set the slug for the about page banner
  console.log("Slug for About Page:", id);
  return (
    <>
      
      {/* Other content */}
      {/* Other content */}
      <Header/>
      <Banner slug={id} />
    </>
  );
};

export default AboutUs;
