import React from "react";
import * as styles from "./footer.module.scss";

import rockstar from "../../assets/footer/rockstarGamesLogo.svg";
import epic from "../../assets/footer/epicGamesLogo.svg";
import riot from "../../assets/footer/riotGames.svg";

function Footer(): React.ReactElement {
  const n = 5;
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
