import { sortingParams } from "@/shared/models/sortingParams";
import { ChangeEvent } from "react";
import * as styles from "src/components/pages/product/productAside.module.scss";
import { useParams } from "react-router-dom";

interface ProductAsideProps {
  filters: sortingParams;
  setFilters: React.Dispatch<React.SetStateAction<sortingParams>>;
}

function ProductAside({ filters, setFilters }: ProductAsideProps) {
  const { category } = useParams();

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prev: sortingParams) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <aside className={styles.filterContainer}>
      <h2>{category}</h2>

      <h3>Sort</h3>
      <div className={styles.filterSection}>
        <div className={styles.sortSection}>
          <span>Criteria</span>
          <select name="sortType" value={filters.sortType || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className={styles.sortSection}>
          <span>Type</span>
          <select name="sortDir" value={filters.sortDir || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <h3>Genres</h3>
      <div className={styles.filterSection}>
        {["All genres", "Shooter", "Arcade", "Survive"].map((genre) => (
          <span key={genre}>
            <input
              type="radio"
              name="genre"
              value={genre === "All genres" ? "" : genre.toLowerCase()}
              checked={filters.genre === genre.toLowerCase()}
              onChange={handleChange}
            />
            {genre}
          </span>
        ))}
      </div>
      <h3>Age</h3>
      <div className={styles.filterSection}>
        {["All ages", "3+", "6+", "12+", "18+"].map((age) => (
          <span key={age}>
            <input
              type="radio"
              name="ageRating"
              value={age === "All ages" ? "" : age}
              checked={filters.ageRating === age}
              onChange={handleChange}
            />
            {age}
          </span>
        ))}
      </div>
    </aside>
  );
}

export default ProductAside;
