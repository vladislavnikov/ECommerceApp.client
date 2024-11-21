import imgLogo from "images/logo.png";
import * as styles from "./theHeader.m.scss";

export default function TheHeader() {
  return (
    <h1 className={styles.header}>
      <img src={imgLogo} alt="logo" />
      Webpack Must Have
    </h1>
  );
}
