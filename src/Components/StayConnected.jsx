//   import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import client from "../client";
// // import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// const StayConnected = () => {
//   // const { slug } = useParams();
//   // const [entry, setEntry] = useState([]);

//   // useEffect(() => {
//   //   const fetchPage = async () => {
//   //     try {
//   //       const response = await client.getEntries({
//   //         content_type: "component",
//   //         "sys.id": "44domFAPPtLBfKhcsj6tye",
//   //       });
//   //       console.log(response);
//   //       if (response.items.length) {
//   //         setEntry(response.items);
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };
//   //   fetchPage();
//   // }, [slug]);

//   return (
//     <>
//       {/* <section className="stay-connected">
//         {entry.map((item) => {
//           const { title, subTitle } = item.fields;
//           const imageUrl = item.fields.image.fields.file.url;
//           const googleMapsUrl = item.fields.googleMapsUrl; // Replace with your actual field name
//           const id = item.sys.id;

//           return (
//             <React.Fragment key={id}>
//               <div className="basicComponent">
//                 <div className="container">
//                   <div className="basicComponent_wrapper">
//                     <div>
//                       <h3>{subTitle}</h3>
//                       <h2>{title}</h2>
//                       <div className="basicComponent_content">
//                         <div>
//                           {/* Manually create and render the Google Maps iframe */}
//                           {/* <iframe
//                             src={googleMapsUrl}
//                             width="100%"
//                             height="400"
//                             allowFullScreen
//                             title="Google Map"
//                           ></iframe>
//                         </div>
//                         <div>
//                           <img src={imageUrl} alt={title} width={100} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </section> */} 
//       <h1>Stay Connected</h1>
//     </>
//   );
// };

// export default StayConnected;

import React from "react";
import { graphql, useStaticQuery, Link} from "gatsby";
import Address from "./Address";

const StayConnected = () => {
  const data = useStaticQuery(query);
  const { allContentfulComponent } = data;

  return (
    <>
      <section className="stay-connected">
        {allContentfulComponent.nodes.map((item) => {
          const { title, subTitle, image, googleMapsUrl } = item;

          return (
            <React.Fragment key={item.id}>
              <div className="basicComponent">
                <div className="container">
                  <div className="basicComponent_wrapper">
                    <div>
                      <h3>{subTitle}</h3>
                      <h2>{title}</h2>
                      <div className="basicComponent_content">
                        <div>
                          <iframe
                            src={googleMapsUrl}
                            width="100%"
                            height="400"
                            allowFullScreen
                            title="Google Map"
                          ></iframe>
                        </div>
                        <div>
                          <img
                            src={image.file.url}
                            alt={title}
                            width={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Address/>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </>
  );
};

export default StayConnected;

export const query = graphql`
query{
  allContentfulComponent(filter: {title: {eq: "STAY CONNECTED"}}) {
    nodes {
      id
      title
      subTitle
      image {
        file {
          url
        }
      }
      googleMapsUrl
    }
  }
}`;

