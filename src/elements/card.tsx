import pc from "src/assets/platforms/pc.png";
import ps5 from "src/assets/platforms/ps.png";
import xbox from "src/assets/platforms/xbox.png";
import * as styles from "./card.m.scss";

interface GameCardProps {
  title: string;
  price: string;
  rating: number;
  ageRating: number;
  cover: string;
  platforms: string[];
  releaseDate: string;
  description: string;
}

const platformIcons: { [key: string]: string } = {
  pc,
  ps5,
  xbox,
};

function GameCard({ title, price, rating, ageRating, cover, platforms, releaseDate, description }: GameCardProps) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <div className={styles.platformIcons}>
            {platforms.map((platform) => {
              const platformIcon = platformIcons[platform.toLowerCase()];
              return platformIcon ? (
                <img key={releaseDate} src={platformIcon} alt={platform} className={styles.platformIcon} />
              ) : (
                <span key={platform} className={styles.platformIcon}>
                  {platform.toUpperCase()}
                </span>
              );
            })}
          </div>
          <img src={cover} alt={title} className={styles.gameCover} />
          <div className={styles.cardDetails}>
            <div className={styles.titleRow}>
              <p className={styles.gameTitle}>{title}</p>
              <p className={styles.gamePrice}>{price}$</p>
            </div>
            <p className={styles.gameRating}>
              {Array.from({ length: Math.round(rating) }, (_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </p>
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <p className={styles.description}>{description}</p>
          <p className={styles.ageRating}>{ageRating}+</p>
          <button className={styles.addToCartButton} type="button">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
