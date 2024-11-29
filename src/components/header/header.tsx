import { NavLink } from "react-router-dom";
import ROUTES from "src/constants/routes";
import * as styles from "./header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Store</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? styles.active : "")}>
          Home
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => (isActive ? styles.active : "")}>
          Products
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => (isActive ? styles.active : "")}>
          About
        </NavLink>
        <NavLink to={ROUTES.NOT_FOUND} className={({ isActive }) => (isActive ? styles.active : "")}>
          Sign In
        </NavLink>
        <NavLink to={ROUTES.NOT_FOUND} className={({ isActive }) => (isActive ? styles.active : "")}>
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
