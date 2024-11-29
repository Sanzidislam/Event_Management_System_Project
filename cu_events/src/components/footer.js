import React from "react";
import './footer.css';
const Footer = () => {
  return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} Event Hunt. All rights reserved.</p>
        <p>Designed with ❤️ by [Sanzid Islam Mahi]</p>
      </footer>
  );
};

export default Footer;
