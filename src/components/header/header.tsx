import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "src/components/header/dropdown";
import { ROUTES, PRODUCT_ROUTES } from "src/constants/routes";
import * as styles from "src/components/header/header.module.scss";
import logOutImage from "src/assets/icons/logout.png";
import userIcon from "src/assets/icons/user.png";
import shoppingCard from "src/assets/icons/shoppingCart.png";
import { RootState } from "src/redux/store/store";
import { UserAction } from "src/redux/slices/userSlice";
import { useCart } from "src/elements/cartContext";
import SignInModal from "./modals/signInModal";
import SignUpModal from "./modals/signUpModal";

function Header() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { itemsCount } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(UserAction.logout());
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Store</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? styles.active : "")}>
          Home
        </NavLink>

        <Dropdown label="Products" routes={PRODUCT_ROUTES} />

        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => (isActive ? styles.active : "")}>
          About
        </NavLink>

        {currentUser ? (
          <>
            <NavLink to={ROUTES.CART} className={({ isActive }) => (isActive ? styles.active : "")}>
              <div className={styles.cartIcon}>
                <img src={shoppingCard} alt="Shopping Cart" />
                {itemsCount > 0 ? <span>{itemsCount}</span> : null}
              </div>
            </NavLink>
            <NavLink to={ROUTES.PROFILE} className={({ isActive }) => (isActive ? styles.active : "")}>
              <span className={styles.user}>
                <img src={userIcon} alt="User Icon" />
                {currentUser.username}
              </span>
            </NavLink>
            <button className={styles.signOut} onClick={handleSignOut} type="button" aria-label="Sign out">
              <img src={logOutImage} alt="Log Out" />
            </button>
          </>
        ) : (
          <>
            <button className={styles.signIn} onClick={() => setSignInOpen(true)} type="button">
              Sign In
            </button>
            <button className={styles.signUp} onClick={() => setSignUpOpen(true)} type="button">
              Sign Up
            </button>
          </>
        )}
      </nav>

      <SignInModal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />

      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
    </header>
  );
}

export default Header;
