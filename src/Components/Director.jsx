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
      filter: { title: { eq: "Director and Lead Trainer" }, pageType: { eq: "Home" } }
    ) {
      nodes {
        title
        pageType
        subTitle
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
        image {
          gatsbyImageData
        }
      }
    }
  }
`
const Director = () => {
  const [directorItems, setDirectorItems] = useState([]);
  const [img, setImg] = useState("");
  const { slug } = useParams();
  const data = useStaticQuery(query);
  const entries = data.allContentfulComponent.nodes;

  // const [entry, setEntry] = useState([]);

  useEffect(() => {
    //  const fetchPage = async () => {
    //    try {
    //      const response = await client.getEntries({
    //        content_type: "component",
    //        "sys.id": "2Aq8vl8W4kEQtRerKjccgg",
    //      });
    //      console.log(response);
    //      if (response.items.length) {
    //        setEntry(response.items);
    //      }
    //    } catch (error) {
    //      console.error(error);
    //    }
    //  };
    //  fetchPage();
    async function fetchPage() {
      try {
        setDirectorItems(entries.reverse());
        // console.log(page_id);
        // console.log(entries);
        // bannerItems.map(((entries) => (console.log(JSON.parse(entries.description.raw)))));
        // console.log(entries[0]?.description.references[0]?.url);
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
<section className="director">
      {directorItems.map((item) => {
          const { title, description, subTitle, ctaButton, link, image } = item;

          // Check if item.description exists before accessing its properties
          const rawDescription = description ? description.raw : "";

          let richTextContent = null;
          try {
            // Check if rawDescription is a non-empty string before parsing
            if (rawDescription.trim() !== "") {
              richTextContent = documentToReactComponents(JSON.parse(rawDescription));
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }

          const id = item.title; // This might need adjustment based on your data structure.

          return (
            <React.Fragment key={id}>
              <div className="basicComponent">
                <div className="container">
                  <div className="title_subtitle">
                    <h2>{title}</h2>
                    <h3>{subTitle}</h3>
                  </div>
                  <div className="basicComponent_wrapper">
                    <div className="basicComponent_content">
                      {richTextContent}
                      <a href={link} className="cta-button">
                        {ctaButton}
                      </a>
                    </div>
                    <div className="right_img">
                      {/* Use GatsbyImage for better performance */}
                      {image && (
                        <GatsbyImage
                          image={image.gatsbyImageData}
                          alt={title}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
      <h1>Director</h1>
    </>
  );
};

export default Director;
