import React from "react";
import rockstar from "src/assets/footer/rockstarGamesLogo.svg";
import epic from "src/assets/footer/epicGamesLogo.svg";
import riot from "src/assets/footer/riotGames.svg";
import * as styles from "./footer.module.scss";

function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>firstName.lastName@ventionteams.com</p>
        <p>Students Labs Vention 2023</p>
        <div className={styles.underline} />
      </div>
      <div className={styles.footerRight}>
        <div className={styles.logos}>
          <img src={rockstar} alt="Rockstar Logo" className={styles.footerLogo} />
          <img src={epic} alt="Epic Games Logo" className={styles.footerLogo} />
          <img src={riot} alt="Riot Games Logo" className={styles.footerLogo} />
        </div>
        <div className={styles.underline} />
      </div>
    </footer>
  );
}

export default Footer;
