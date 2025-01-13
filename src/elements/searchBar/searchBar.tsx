import { useState, useEffect, ChangeEvent } from "react";
import { debounce } from "lodash";
import { Game } from "src/shared/models/game";
import { searchGames } from "src/api/services/gameService";
import * as styles from "src/elements/searchBar/searchBar.m.scss";

interface SearchBarProps {
  onSearch?: (searchText: string) => void;
  withDropdown?: boolean;
}

function SearchBar({ onSearch, withDropdown = false }: SearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce(async (text: string) => {
    if (withDropdown) {
      setLoading(true);
      try {
        const data = await searchGames(text);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }
  }, 300);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);

    if (onSearch) {
      onSearch(value);
    }

    if (withDropdown) {
      debouncedSearch(value);
    }
  };

  useEffect(() => {
    if (!searchText && withDropdown) {
      setResults([]);
    }

    return debouncedSearch.cancel;
  }, [searchText, withDropdown]);

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
        <input type="text" placeholder="Search" value={searchText} onChange={handleInputChange} className={styles.searchInput} />
        <div className={styles.iconContainer}>{loading ? <div className={styles.spinner} /> : <span />}</div>
      </div>
      {withDropdown && results.length > 0 && (
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
