import { Link } from "react-router-dom";
import PCIcon from "src/assets/categories/computer.svg";
import PlaystationIcon from "src/assets/categories/playstation.svg";
import XboxIcon from "src/assets/categories/xbox.svg";
import { ROUTES } from "src/constants/routes";
import * as styles from "src/components/pages/home/categories/categories.m.scss";

function Categories() {
  return (
    <div className={styles.categories}>
      <h2>Categories</h2>
      <div className={styles.cardContainer}>
        <Link to={ROUTES.CATEGORIES.PC} className={styles.card}>
          <div className={styles.icon}>
            <img src={PCIcon} alt="PC" className={styles.iconImage} />
          </div>
          <p>PC</p>
        </Link>

        <Link to={ROUTES.CATEGORIES.PLAYSTATION} className={styles.card}>
          <div className={styles.icon}>
            <img src={PlaystationIcon} alt="Playstation 5" className={styles.iconImage} />
          </div>
          <p>Playstation 5</p>
        </Link>

        <Link to={ROUTES.CATEGORIES.XBOX} className={styles.card}>
          <div className={styles.icon}>
            <img src={XboxIcon} alt="Xbox One" className={styles.iconImage} />
          </div>
          <p>Xbox One</p>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
