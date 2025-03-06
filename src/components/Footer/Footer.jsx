import React from "react";
import styles from "./Footer.module.css";

const socialLinks = [
  { name: "Facebook", icon: "/assets/facebook.png", url: "https://www.facebook.com" },
  { name: "LinkedIn", icon: "/assets/linkedin.png", url: "https://www.linkedin.com" },
  { name: "YouTube", icon: "/assets/youtube.png", url: "https://www.youtube.com" },
  { name: "Instagram", icon: "/assets/instagram.png", url: "https://www.instagram.com" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Follow Us</h3>
      <div className={styles.socialIcons}>
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
            <img src={link.icon} alt={link.name} className={styles.icon} />
          </a>
        ))}
      </div>
      <p>@2025 www.smartshopping.com | All rights reserved.</p>
    </footer>
  );
};

export default Footer;
