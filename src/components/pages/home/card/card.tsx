import platformIcons from "src/constants/platforms";
import { Game } from "src/shared/models/game";
import * as styles from "src/components/pages/home/card/card.m.scss";
import { CartItem } from "@/shared/models/cartItems";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { useCart } from "src/elements/cartContext";

interface GameCardProps extends Game {}

function GameCard({ title, price, rating, ageRating, cover, platforms, description, id }: GameCardProps) {
  const { category } = useParams();
  const { updateItemsCount } = useCart();
  const platformToUse = category || "PC";

  if (!platformToUse) {
    console.error("No valid platform available to assign to CartItem");
    return null;
  }

  const handleAddToCart = (product: CartItem) => {
    alert("Added to the shopping cart!");
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const existingItem = cart.find((item: CartItem) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const formattedDate = new Date().toLocaleDateString("en-US");
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        platform: platformToUse,
        availablePlatforms: platforms,
        quantity: 1,
        date: formattedDate,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateItemsCount();
  };

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
              <Rating name="half-rating" defaultValue={rating} precision={0.5} />
            </p>
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <p className={styles.description}>{description}</p>
          <p className={styles.ageRating}>{ageRating}+</p>
          <button
            className={styles.addToCartButton}
            onClick={() =>
              handleAddToCart({
                id,
                name: title,
                price: Number(price),
                platform: platformToUse,
                availablePlatforms: platforms,
                quantity: 1,
                date: new Date().toString(),
              })
            }
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
