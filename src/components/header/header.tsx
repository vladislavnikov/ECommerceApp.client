import { useState } from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "src/constants/routes";
import * as styles from "./header.module.scss";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Store</h1>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? styles.active : "")}>
          Home
        </NavLink>
        <div className={styles.dropdown} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => `${styles.dropbtn} ${isActive ? styles.active : ""}`}>
            Products
          </NavLink>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <NavLink to="/categories/pc" className={({ isActive }) => (isActive ? styles.active : "")}>
                PC
              </NavLink>
              <NavLink to="/categories/playstation" className={({ isActive }) => (isActive ? styles.active : "")}>
                Playstation 5
              </NavLink>
              <NavLink to="/categories/xbox" className={({ isActive }) => (isActive ? styles.active : "")}>
                Xbox One
              </NavLink>
            </div>
          )}
        </div>
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
