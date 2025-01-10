import { useState, useEffect } from "react";
import { Game } from "src/shared/models/game";
import { fetchTopGames } from "src/api/services/gameService";
import SearchBar from "../home/searchBar/searchBar";
import * as styles from "./productSection.module.scss";
import GameCard from "../home/card/card";

function ProductSection() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchTopGames();

        const sortedGames = data.sort((a: Game, b: Game) => {
          const dateA = new Date(a.releaseDate).getTime();
          const dateB = new Date(b.releaseDate).getTime();
          return dateB - dateA;
        });

        setGames(sortedGames.slice(0, 3));
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };

    loadGames();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SearchBar />
      <section className={styles.container}>
        <h2>Products</h2>
        <div className={styles.gamesContainer}>
          {games.map((game) => (
            <GameCard key={game.id} {...game} platforms={game.platforms} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductSection;
