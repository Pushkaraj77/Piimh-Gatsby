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
      filter: {title: {eq: "Philosophy"}, pageType: {eq: "Home"}}
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
        image {
          gatsbyImageData
        }
      }
    }
  }
`

const Philosophy = () => {
  const [philosophyItems, setPhilosophyItems] = useState([]);
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
    //        "sys.id": "lWGmoCodntEZhNx8FHv5s",
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
        setPhilosophyItems(entries.reverse());
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

//  const options = {
//   renderNode: {
//     'heading-3 & heading-4': (node, children) => (
//       <div>
//         <h3 className="your-h3-class">{children}</h3>
//         <h4 className="your-h4-class">{children}</h4>
//       </div>
//     ),
//   },
// };


  return (
    <>
      <section className="philosophy">
        {philosophyItems.map((item) => {
          const { title, description, subTitle, image } = item;

          // Check if item.description exists before accessing its properties
          const rawDescription = description ? description.raw : "";
          const imageUrl = image?.gatsbyImageData || "";

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
              <div className="container">
                <div className="basicComponent">
                  <div className="title_sub_title">
                    <h3>{subTitle}</h3>
                    <h2 className="heading-title">{title}</h2>
                  </div>
                  <div className="basicComponent_wrapper d-flex">
                    <div className="Right_img">
                      {/* Use GatsbyImage for better performance */}
                      <GatsbyImage
                        image={image?.gatsbyImageData}
                        alt={title}
                        width={100}
                      />
                    </div>
                    <div className="basicComponent_content">
                      {richTextContent}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </>
  );
};

export default Philosophy;
