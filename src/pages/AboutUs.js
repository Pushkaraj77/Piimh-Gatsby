// About.js
import React from "react";
import Banner from "../Components/Banner";

const AboutUs = () => {
  const slug = "about-page-banner"; // Set the slug for the about page banner
  console.log("Slug for About Page:", slug);
  return (
    <>
      {/* Other content */}
      <Banner slug={slug} />
      <h1>about us page</h1>
      {/* Other content */}
    </>
  );
};

export default AboutUs;
