import { useState, useEffect } from "react";
import { Game } from "src/shared/models/game";
import { getProducts } from "@/api/services/gameService";
import { sortingParams } from "@/shared/models/sortingParams";
import useSpinner from "@/helpers/hooks/useSpinner";
import SearchBar from "@/elements/searchBar/searchBar";
import { useParams } from "react-router-dom";
import * as styles from "./productSection.module.scss";
import GameCard from "../home/card/card";

function ProductSection({ filters }: { filters: sortingParams }) {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const { loading, showSpinner, hideSpinner, spinner } = useSpinner();

  const { category } = useParams();

  useEffect(() => {
    const loadGames = async () => {
      showSpinner();
      // eslint-disable-next-line no-param-reassign
      filters.category = category;
      try {
        const data = await getProducts(filters);

        setGames(data);
        setFilteredGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        hideSpinner();
      }
    };

    loadGames();
  }, [category, filters, showSpinner, hideSpinner]);

  const handleSearch = (searchText: string) => {
    const lowercasedSearch = searchText.toLowerCase();

    setTimeout(() => {
      const filtered = games.filter((game) => game.title.toLowerCase().includes(lowercasedSearch));
      setFilteredGames(filtered);
      hideSpinner();
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar onSearch={handleSearch} />
      <section className={styles.container}>
        <h2>Products</h2>
        {loading ? (
          spinner
        ) : (
          <div className={styles.gamesContainer}>
            {filteredGames.length > 0
              ? filteredGames.map((game) => <GameCard key={game.id} {...game} platforms={game.platforms} />)
              : "No games available with the selected filters"}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductSection;
