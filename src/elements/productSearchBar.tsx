import { useState, ChangeEvent } from "react";
import * as styles from "src/components/pages/home/searchBar/searchBar.m.scss";

interface ProductSearchBarProps {
  onSearch: (searchText: string) => void;
}

function ProductSearchBar({ onSearch }: ProductSearchBarProps) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <form className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Search for games" value={searchText} onChange={handleInputChange} className={styles.searchInput} />
      </div>
    </form>
  );
}

export default ProductSearchBar;
