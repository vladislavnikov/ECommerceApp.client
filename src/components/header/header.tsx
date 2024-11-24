import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Games Market</h1>
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
      </nav>
    </header>
  );
};

export default Header;
