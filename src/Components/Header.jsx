import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery, Link} from "gatsby";
import logo from "../images/logo.png";

const query = graphql`
  query {
    allContentfulMenu {
      nodes {
        link
        name
        id
      }
    }
  }
`

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for responsive menu toggle
  const data = useStaticQuery(query);

  useEffect(() => {
    async function getMenuItems() {
      const entries = data.allContentfulMenu.nodes;
      const sort_name = entries[0].name;
      // console.log(entries);
      // console.log(sort_name);
      setMenuItems(entries);
    }
    getMenuItems();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="d-flex">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="humber_menu" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </div>
            <nav className={isMenuOpen ? "open" : ""}>
              <ul>
                {menuItems.slice().reverse().map((entries) => (
                  <li key={entries.id}>
                    <Link
                      to={entries.link}
                    >
                      {entries.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header> 
    </>
  );
};

export default Header;
