import { useEffect, useState } from "react";
import GameCard from "./card";
import * as styles from "./newGames.m.scss";

interface Game {
  id: number;
  title: string;
  price: string;
  rating: number;
  ageRating: number;
  cover: string;
  platforms: string[];
  releaseDate: string;
  description: string;
}

function NewGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/products/top");
        if (!response.ok) throw new Error("Failed to fetch games data");

        const data: Game[] = await response.json();
        console.log("Fetched games:", data);

        const sortedGames = data.sort((a, b) => {
          const dateA = new Date(a.releaseDate).getTime();
          const dateB = new Date(b.releaseDate).getTime();
          return dateB - dateA;
        });

        setGames(sortedGames.slice(0, 3));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  console.log(games);

  return (
    <div className={styles.newGames}>
      <h2>New Games</h2>
      <div className={styles.gamesContainer}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            price={game.price}
            rating={game.rating}
            ageRating={game.ageRating}
            cover={game.cover}
            platforms={game.platforms}
            releaseDate={game.releaseDate}
            description={game.description}
          />
        ))}
      </div>
    </div>
  );
}

export default NewGames;
