import { useParams } from "react-router-dom";
import * as styles from "src/components/pages/product/productAside.module.scss";

function ProductAside() {
  const { category } = useParams();

  return (
    <aside className={styles.filterContainer}>
      <h2>{category}</h2>

      <h3>Sort</h3>
      <div className={styles.filterSection}>
        <div className={styles.sortSection}>
          <span>Criteria</span>
          <select>
            <option>Name</option>
            <option>Price</option>
            <option>Rating</option>
          </select>
        </div>
        <div className={styles.sortSection}>
          <span>Type</span>
          <select>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>
      <h3>Genres</h3>
      <div className={styles.filterSection}>
        <span>
          <input type="radio" value="All genres" />
          All genres
        </span>
        <span>
          <input type="radio" value="Shooter" />
          Shooter
        </span>
        <span>
          <input type="radio" value="Arcade" />
          Arcade
        </span>
        <span>
          <input type="radio" value="Survive" />
          Survive
        </span>
      </div>
      <h3>Age</h3>
      <div className={styles.filterSection}>
        <span>
          <input type="radio" value="All ages" />
          All ages
        </span>
        <span>
          <input type="radio" value="3+" />
          3+
        </span>
        <span>
          <input type="radio" value="6+" />
          6+
        </span>
        <span>
          <input type="radio" value="12+" />
          12+
        </span>
        <span>
          <input type="radio" value="18+" />
          18+
        </span>
      </div>
    </aside>
  );
}

export default ProductAside;
