import React from "react";
import styles from "./Footer.module.scss";
import company1 from "../../assets/images/company1.png";
import company2 from "../../assets/images/company2.png";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Incredible convenient</p>
      <div className={styles.icons}>
        <a href="https://www.company1.com" target="_blank" rel="noopener noreferrer">
          <img src={company1} alt="Company 1" />
        </a>
        <a href="https://www.company2.com" target="_blank" rel="noopener noreferrer">
          <img src={company2} alt="Company 2" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
