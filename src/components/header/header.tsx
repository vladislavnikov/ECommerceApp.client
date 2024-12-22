import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "src/components/header/dropdown";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";
import SignUp from "src/components/header/modals/signUp";
import { ROUTES, PRODUCT_ROUTES } from "src/constants/routes";
import * as styles from "src/components/header/header.module.scss";
import logOutImage from "src/assets/icons/logout.png";
import userIcon from "src/assets/icons/user.png";
import shoppingCard from "src/assets/icons/shoppingCart.png";
import { useUser } from "src/elements/userContext";

function Header() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const { currentUser, onAuthUser, handleSignIn } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    onAuthUser(null);
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
            <NavLink to={ROUTES.PROFILE} className={({ isActive }) => (isActive ? styles.active : "")}>
              <img src={shoppingCard} alt="Shopping Cart" />
            </NavLink>
            <NavLink to={ROUTES.PROFILE} className={({ isActive }) => (isActive ? styles.active : "")}>
              <span className={styles.user}>
                <img src={userIcon} alt="User Icon" />
                {currentUser}
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

      {isSignInOpen && (
        <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)}>
          <SignIn
            onSubmit={(username, password) => {
              handleSignIn(username, password);
              setSignInOpen(false);
            }}
          />
        </Modal>
      )}

      {isSignUpOpen && (
        <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)}>
          <SignUp
            onSubmit={(username, password) => {
              handleSignIn(username, password);
              setSignUpOpen(false);
            }}
          />
        </Modal>
      )}
    </header>
  );
}

export default Header;
