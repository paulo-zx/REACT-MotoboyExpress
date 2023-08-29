import React from "react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-primary text-light text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Motoboy Express. Desenvolvido por Paulo Roberto Ribeiro Morais.</p>
        <div className="social-icons">
          <a href="https://github.com/paulo-zx" target="_blank" rel="noopener noreferrer">
            <IoLogoGithub className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/paulo-roberto-127283147/" target="_blank" rel="noopener noreferrer">
            <IoLogoLinkedin className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
