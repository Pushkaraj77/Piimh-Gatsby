import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { graphql, useStaticQuery} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";



const Banner = (props) => {
  const [bannerItems, setBannerItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [renderEntry, setRenderEntry] = useState([]);
  const page_id = props;
  const read_slug = page_id.slug;

  const data = useStaticQuery(query);
  const entries = data.allContentfulBannerSection.nodes;

  

  useEffect(() => {
    async function getMenuItems() {
      try {
        setBannerItems(entries);
        //console.log(page_id.slug);
        try {
          await Promise.all(bannerItems.map(async (element) => {
            console.log(element.contentful_id);
  
            if (element.contentful_id === read_slug) {
              const entry = element;
              await setRenderEntry(entry);
              console.log(renderEntry);
            }
          }));
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
        //bannerItems.map(((entries) => (console.log(JSON.parse(entries.description.raw))));
        // console.log(entries[0]?.description.references[0].url);
        setBackgroundImage(entries[0]?.backgroundImage?.url || "");
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    getMenuItems();
  }, [read_slug]);
  
  
  
  

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
                    {/* {console.log(node)} */}
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
        {renderEntry ? (
          <React.Fragment>
            {renderRichText(JSON.parse(renderEntry.description.raw))}
          </React.Fragment>
        ) : (
          bannerItems.map((entries) => (
            <React.Fragment key={entries.id}>
              {renderRichText(JSON.parse(entries.description.raw))}
            </React.Fragment>
          )))
        }
      </div>

      </div>
    </section>
  );
};

export default Banner;

export const query = graphql`
  query MyQuery ($slug: String){
    allContentfulBannerSection (filter: { slug: {eq: $slug}}){
      nodes {
        id
        title
        slug
        contentful_id
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