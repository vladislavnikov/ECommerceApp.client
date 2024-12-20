import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "src/constants/routes";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";
import * as styles from "./dropdown.m.scss";

interface DropdownProps {
  label: string;
  routes: Route[];
  onSignIn: (username: string, password: string) => void;
}

function Dropdown({ label, routes, onSignIn }: DropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

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

      {isSignInOpen && (
        <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)}>
          <SignIn
            onSubmit={(username, password) => {
              onSignIn(username, password);
              setSignInOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Dropdown;
