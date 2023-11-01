import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import client from "../client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql, useStaticQuery } from "gatsby";


export const query = graphql`
  {
    allContentfulBasicPage {
      nodes {
        title
        subTitle
        slug
        contentful_id
        pageComponent {
          ... on ContentfulComponent {
            bgColor
            ctaButton
          }
        }
        description {
          raw
        }
      }
    }
  }
`

const BasicComponent = () => {
  const { slug } = useParams();
  const [entry, setEntry] = useState([]);
  const data = useStaticQuery(query);
  const entries = data.allContentfulBasicPage.nodes;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setEntry(entries);
        // entry.map((entries) => (console.log(entries.description)));
        // console.log(entries[0]);
        // entry.map((entries) => (console.log(entries.title)));
      } catch (error) {
        console.error("Error fetching Basic page items:", error);
      }
    };

    fetchPage()
  }, [slug])
  

  return (
    <>
      <section className="Home-about">
        {entry.map((item) => {
          const { title, subTitle, bgColor } =
          item;
          const id = item.contentful_id;
          console.log(item);
          // const richTextContent = documentToReactComponents(description);
          return (
            <React.Fragment key={id}>
              <div
                className="basicComponent"
                style={{ backgroundColor: bgColor }}
              >
                <div className="container">
                  <div className="basicComponent_wrapper">
                    <h2>{title}</h2>
                    <h3>{subTitle}</h3>
                    {/* <div className="basicComponent_content">
                      {richTextContent}
                      <a href={slug} className="cta-button">
                      {ctaButton}
                    </a>
                    </div> */}
                    
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
      <h1>basicComponent</h1>
    </>
  );
};

export default BasicComponent;