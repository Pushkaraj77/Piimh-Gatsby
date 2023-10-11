import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { graphql, useStaticQuery} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const query = graphql`
  query {
    allContentfulBannerSection {
      nodes {
        title
        description {
          raw
          references {
            url
          }
        }
        backgroundImage {
          url
        }
      }
    }
  }
`

const Banner = () => {
  const [bannerItems, setBannerItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const { slug } = useParams();
  const data = useStaticQuery(query);


 useEffect(() => {
    async function getMenuItems() {
      try {
        const entries = data.allContentfulBannerSection.nodes;
        setBannerItems(entries.reverse());
        // console.log(entries);
        // bannerItems.map(((entries) => (console.log(JSON.parse(entries.description.raw)))));
        // console.log(entries[0]?.description);
        setBackgroundImage(
          entries[0]?.backgroundImage?.url || ""
        );
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    getMenuItems();
  }, [slug]);

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
              //   // const {title} = node.title;
              //   // const {description} = JSON.parse(node.description.raw);
              //   // const {imageUrl} = node.description.references[0].url;
              //   // const altText = description || title || "Image";
                return (
                  <div className="custom-rich-text-block">
                    {console.log(node)}
              {/* //       <GatsbyImage image = {imageUrl} alt = {altText}/> */}
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
            {/* {console.log(entries.description.raw[1]?.content.value)} */}
            {/* <h1>{entries.title}</h1> */}
            {/* <GatsbyImage image = {entries.description.references.url} alt={entries.id} /> */}
          </React.Fragment>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Banner;
