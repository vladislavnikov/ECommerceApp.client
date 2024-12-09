import { useState, useEffect } from "react";
import { Game } from "src/shared/models/game";
import GameCard from "@/components/pages/home/card/card";
import * as styles from "src/components/pages/home/newGames/newGames.m.scss";
import { fetchTopGames } from "src/api/services/gameService";

function NewGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Failed to load games.");
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.newGames}>
      <h2>New Games</h2>
      <div className={styles.gamesContainer}>
        {games.map((game) => (
          <GameCard key={game.id} {...game} platforms={game.platforms} />
        ))}
      </div>
    </div>
  );
}

export default NewGames;
