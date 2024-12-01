import * as styles from "./searchBar.m.scss";

function SearchBar() {
  return (
    <form className={styles.searchBar}>
      <input type="text" placeholder="Search" className={styles.searchInput} />
    </form>
  );
}

export default SearchBar;
