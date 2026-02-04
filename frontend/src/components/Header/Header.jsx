import React from "react";
import Nav from "../Nav/Nav";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      {/* El Nav ya contiene el logo y los links, así que el Header actúa como el contenedor maestro */}
      <Nav />
    </header>
  );
};

export default Header;
