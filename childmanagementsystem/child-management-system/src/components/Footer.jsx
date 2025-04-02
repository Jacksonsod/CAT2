import React from "react";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Import Material-UI icons
import '../styles/components.css';

const Footer = () => {
  return (
    <footer className="footer-styles">
      <p>&copy; {new Date().getFullYear()} Day Care Management. All rights reserved.</p>
      <div className="social-media-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <Facebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <Twitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <Instagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
