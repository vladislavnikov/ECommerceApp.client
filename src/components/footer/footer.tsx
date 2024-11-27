import React from "react";
import * as styles from "./footer.module.scss";

function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <p>Incredible convenient</p>
      <div className={styles.icons}>
        <a href="https://www.company1.com" target="_blank" rel="noopener noreferrer">
          <img alt="Company 1" />
        </a>
        <a href="https://www.company2.com" target="_blank" rel="noopener noreferrer">
          <img alt="Company 2" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
