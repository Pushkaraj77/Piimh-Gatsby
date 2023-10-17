import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { graphql, useStaticQuery} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";



const query = graphql`
  query MyQuery{
    allContentfulBannerSection {
      nodes {
        id
        title
        slug
        description {
          raw
          references {
            gatsbyImageData
          }
        }
        backgroundImage {
          url
        }
      }
    }
  }
`
const Slugrelate = () => {
  const { slug } = useParams();
  return (
    slug
  );

}


const Banner = () => {
  const [bannerItems, setBannerItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  
  const data = useStaticQuery(query);
  const entries = data.allContentfulBannerSection.nodes;


 useEffect(() => {
    async function getMenuItems() {
      try {
        setBannerItems(entries.reverse());
        // try {
        //   for (let index = 0; index < entries.length; index++) {
        //     if (slug === entries[index].slug) {
        //       const data = entries[index];
        //       console.log(data);
        //     }
            
        //   }
          
        // } catch (error) {
          
        // }
        // bannerItems.map(((entries) => (console.log(JSON.parse(entries.description.raw)))));
        // console.log(entries[0]?.description.references[0].url);
        setBackgroundImage(
          entries[0]?.backgroundImage?.url || ""
        );
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    getMenuItems();
  }, [Slugrelate()]);

  const renderCustomRichTextHeading = (node, children) => (
    <div className="custom-rich-text-heading">
      {children.map((child, index) => (
        <h1 key={index}>{child}</h1>
      ))}
    </div>
  );

  const renderCustomRichTextSubheading = (node, children) => (
    <div className="custom-rich-text-subheading">
      {children.map((child, index) => (
        <h2 key={index}>{child}</h2>
      ))}
    </div>
  );

  const headingRenderers = {
    [BLOCKS.HEADING_1]: renderCustomRichTextHeading,
    [BLOCKS.HEADING_2]: renderCustomRichTextSubheading,
  };

  const renderRichText = (richText) => {
    if (richText) {
      return (
        <div className="custom-rich-text-container">
          {documentToReactComponents(richText, {
            renderNode: {
              ...headingRenderers,
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const url = entries[0].description.references[0].gatsbyImageData;
                const altText = "Image";
                return (
                  <div className="custom-rich-text-block">
                    {console.log(node)}
                    <GatsbyImage image = {url} alt = {altText}/>
                  </div>
                );
              },
            },
          })}
        </div>
      );
    }
    return null;
  };


  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="background-overlay"></div>
      <div className="container">
      <div className="d-flex">
        {bannerItems.map((entries) => (
          <React.Fragment key={entries.id}>
            {renderRichText(JSON.parse(entries.description.raw))}
          </React.Fragment>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Banner;
