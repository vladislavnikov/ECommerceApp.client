import { useState, useEffect } from "react";
import { debounce } from "lodash";
import * as styles from "./searchBar.m.scss";

interface Game {
  id: number;
  title: string;
  cover: string;
}

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce(async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?text=${text}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    } else {
      setResults([]);
    }

    return debouncedSearch.cancel;
  }, [searchText]);

  const handleSelectGame = (game: Game) => {
    alert(`Got product: ${game.title}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, game: Game) => {
    if (event.key === "Enter" || event.key === " ") {
      handleSelectGame(game);
    }
  };

  return (
    <form className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.iconContainer}>{loading ? <div className={styles.spinner} /> : <span />}</div>
      </div>
      {results.length > 0 && (
        <ul className={styles.resultsDropdown}>
          {results.map((game) => (
            <li key={game.id} className={styles.resultItem}>
              <button
                onClick={() => handleSelectGame(game)}
                onKeyDown={(e) => handleKeyDown(e, game)}
                className={styles.resultButton}
                type="button"
              >
                <img src={game.cover} alt={game.title} className={styles.resultImage} />
                <span className={styles.resultText}>{game.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;
