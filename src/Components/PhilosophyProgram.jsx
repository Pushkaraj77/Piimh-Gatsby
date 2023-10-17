import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { graphql, useStaticQuery} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
// import { useParams } from "react-router-dom";
// import client from "../client";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


const query = graphql`
  query {
    allContentfulComponent(
      filter: {title: {eq: "PSYCHOTHERAPY TRAINING PROGRAM"}, pageType: {eq: "Home"}}
    ) {
      nodes {
        title
        pageType
        description {
          raw
          references {
            ... on ContentfulAsset {
              gatsbyImageData
            }
          }
        }
        ctaButton
        link
        bgImage {
          gatsbyImageData
        }
      }
    }
  }
`

const PhilosophyProgram = () => {
  const [philosophyProgramItems, setphilosophyProgramItems] = useState([]);
  const [img, setImg] = useState("");
  const { slug } = useParams();
  const data = useStaticQuery(query);
  const entries = data.allContentfulComponent.nodes;
  // const { slug } = useParams();
  // const [entry, setEntry] = useState([]);

   useEffect(() => {
  //   const fetchPage = async () => {
  //     try {
  //       const response = await client.getEntries({
  //         content_type: "component",
  //         "sys.id": "wDrTLBLEbCgDDSbIZGx15",
  //       });
  //       console.log(response);
  //       if (response.items.length) {
  //         setEntry(response.items);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchPage();

  async function fetchPage() {
    try {
      setphilosophyProgramItems(entries.reverse());
      // console.log(entries);
      // bannerItems.map(((entries) => (console.log(JSON.parse(entries.description.raw)))));
      console.log(entries[0]?.description.references[0]?.url);
      setImg(
        entries[0]?.img?.url || ""
      );
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  }
  fetchPage();


   }, [slug]);

  return (
    <>
      <section className="philosophy-program">
        {philosophyProgramItems.map((item) => {
          const { title, description, ctaButton, link, bgImage } = item;

          // Check if item.description exists before accessing its properties
          const rawDescription = description ? description.raw : "";
          const imageUrl = bgImage?.gatsbyImageData || "";

          let richTextContent = null;
          try {
            // Check if rawDescription is a non-empty string before parsing
            if (rawDescription.trim() !== "") {
              richTextContent = documentToReactComponents(
                JSON.parse(rawDescription)
              );
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }

          const id = item.title; // This might need adjustment based on your data structure.

          return (
            <React.Fragment key={id}>
              <div className="basicComponent" style={{ backgroundImage: `url(${bgImage?.gatsbyImageData})` }}>
                <div className="elementor-background-overlay">
                  {/* Use GatsbyImage for better performance */}
                  <GatsbyImage
                    image={bgImage?.gatsbyImageData}
                    alt={title}
                    // width={100}
                  />
                </div>
                <div className="container">
                  <div className="basicComponent_wrapper">
                    <div className="background-overlay"></div>
                    <h2>{title}</h2>
                    <div className="basicComponent_content">
                      {richTextContent}
                      <a href={link} className="cta-button">
                        {ctaButton}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
      {/* <h1>PhilProgram</h1> */}
    </>
  );
};

export default PhilosophyProgram;
