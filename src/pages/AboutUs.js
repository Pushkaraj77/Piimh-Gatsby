// About.js
import React from "react";
import Banner from "../Components/Banner";
import Header from "../Components/Header";

const AboutUs = () => {
  const slug = "6STR6Eve39x5dXFgKBIObZ"; // Set the slug for the about page banner
  console.log("Slug for About Page:", slug);
  return (
    <>
      {/* Other content */}
      {/* Other content */}
      <Header/>
      <Banner slug={slug} />
    </>
  );
};

export default AboutUs;
