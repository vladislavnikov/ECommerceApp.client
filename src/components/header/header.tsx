import { useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "src/components/header/dropdown";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";
import SignUp from "src/components/header/modals/signUp";
import { ROUTES, PRODUCT_ROUTES } from "src/constants/routes";
import * as styles from "src/components/header/header.module.scss";

function Header() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleSignIn = (username: string, password: string) => {
    console.log("Signing in:", { username, password });
    setTimeout(() => {
      setUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  const handleSignUp = (username: string, password: string) => {
    console.log("Signing up:", { username, password });
    setTimeout(() => {
      setUser(username);
      setSignUpOpen(false);
    }, 1000);
  };

  const handleSignOut = () => {
    setUser(null);
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

        {user ? (
          <>
            <span className={styles.user}>Hello, {user}</span>
            <button className={styles.signOut} onClick={handleSignOut} type="submit">
              Sign Out
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
          <SignIn onSubmit={handleSignIn} />
        </Modal>
      )}

      {isSignUpOpen && (
        <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)}>
          <SignUp onSubmit={handleSignUp} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
