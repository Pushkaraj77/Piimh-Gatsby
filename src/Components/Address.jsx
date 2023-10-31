import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGooglePlusG
} from "@fortawesome/free-brands-svg-icons";

const Address = () => {
  return (
    <>
      <div className="address">
        <div className="reach">
          <p>REACH US THROUGH</p>
          <ul>
            <li>
              <span><FontAwesomeIcon icon={faLocationDot} /></span>
              <span>834, 31sr A cross Thilaknagar Jayanagar Bangalore 41</span>
            </li>
            <li>
              <span><FontAwesomeIcon icon={faPhone} /></span>
              <span>+91 99720 97848</span>
            </li>
            <li>
              <span><FontAwesomeIcon icon={faEnvelope} /></span>
              <span>deepak@piimh.com</span>
            </li>
          </ul>
        </div>
        <div className="social">
          <p>SOCIAL NETWORKS</p>

          <ul>
            <li>
              <span><FontAwesomeIcon icon={faFacebook}/></span>
              <span>Coming Soon</span>
            </li>
            <li>
              <span><FontAwesomeIcon icon={faTwitter} /></span>
              <span>Coming Soon</span>
            </li>
            <li>
              <span><FontAwesomeIcon icon={faInstagram} /></span>
              <span>Coming Soon</span>
            </li>
            <li>
              <span><FontAwesomeIcon icon={faGooglePlusG} /></span>
              <span>Coming Soon</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Address;