import { useNavigate } from "react-router-dom";
import PCIcon from "src/assets/categories/computer.svg";
import PlaystationIcon from "src/assets/categories/playstation.svg";
import XboxIcon from "src/assets/categories/xbox.svg";
import { ROUTES } from "src/constants/routes";
import * as styles from "src/components/pages/home/categories/categories.m.scss";

function Categories({ user, setSignInOpen }: { user: string | null; setSignInOpen: (open: boolean) => void }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setSignInOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className={styles.categories}>
      <h2>Categories</h2>
      <div className={styles.cardContainer}>
        <a href={ROUTES.CATEGORIES.PC} className={styles.card} onClick={(e) => handleClick(e, ROUTES.CATEGORIES.PC)}>
          <div className={styles.icon}>
            <img src={PCIcon} alt="PC" className={styles.iconImage} />
          </div>
          <p>PC</p>
        </a>

        <a href={ROUTES.CATEGORIES.PLAYSTATION} className={styles.card} onClick={(e) => handleClick(e, ROUTES.CATEGORIES.PLAYSTATION)}>
          <div className={styles.icon}>
            <img src={PlaystationIcon} alt="Playstation 5" className={styles.iconImage} />
          </div>
          <p>Playstation 5</p>
        </a>

        <a href={ROUTES.CATEGORIES.XBOX} className={styles.card} onClick={(e) => handleClick(e, ROUTES.CATEGORIES.XBOX)}>
          <div className={styles.icon}>
            <img src={XboxIcon} alt="Xbox One" className={styles.iconImage} />
          </div>
          <p>Xbox One</p>
        </a>
      </div>
    </div>
  );
}

export default Categories;
