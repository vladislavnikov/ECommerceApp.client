// src/components/header/dropdown.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "src/constants/routes";
import * as styles from "./dropdown.m.scss";

interface DropdownProps {
  label: string;
  routes: Route[];
}

function Dropdown({ label, routes }: DropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={styles.dropdown} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
      <span className={styles.dropbtn}>
        {label}
        <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ""}`}>&#9660;</span>
      </span>

      {isDropdownOpen && (
        <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.open : ""}`}>
          {routes.map(({ path, name }) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? styles.active : "")}>
              {name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
