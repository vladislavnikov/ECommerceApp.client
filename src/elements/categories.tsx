import { Link } from "react-router-dom";
import PCIcon from "src/assets/categories/computer.svg";
import PlaystationIcon from "src/assets/categories/playstation.svg";
import XboxIcon from "src/assets/categories/xbox.svg";
import * as styles from "./categories.m.scss";

function Categories() {
  return (
    <div className={styles.categories}>
      <h2>Categories</h2>
      <div className={styles.cardContainer}>
        <Link to="/products/category/pc" className={styles.card}>
          <div className={styles.icon}>
            <img src={PCIcon} alt="PC" style={{ width: "50px", height: "50px", filter: "invert(0.5)" }} />
          </div>
          <p>PC</p>
        </Link>

        <Link to="/products/category/playstation" className={styles.card}>
          <div className={styles.icon}>
            <img src={PlaystationIcon} alt="Playstation 5" style={{ width: "50px", height: "50px", filter: "invert(0.5)" }} />
          </div>
          <p>Playstation 5</p>
        </Link>

        <Link to="/products/category/xbox" className={styles.card}>
          <div className={styles.icon}>
            <img src={XboxIcon} alt="Xbox One" style={{ width: "50px", height: "50px", filter: "invert(0.5)" }} />
          </div>
          <p>Xbox One</p>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
