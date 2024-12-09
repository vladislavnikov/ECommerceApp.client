import platformIcons from "src/constants/platforms";
import { Game } from "src/shared/models/game";
import * as styles from "./card.m.scss";

interface GameCardProps extends Game {}

function GameCard({ title, price, rating, ageRating, cover, platforms, description }: GameCardProps) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <div className={styles.platformIcons}>
            {platforms.map((platform) => {
              const platformIcon = platformIcons[platform.toLowerCase()];
              return platformIcon ? (
                <img key={platform} src={platformIcon} alt={platform} className={styles.platformIcon} />
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
