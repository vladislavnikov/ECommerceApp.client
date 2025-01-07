import React, { useState } from "react";
import InputText from "src/elements/inputText";
import passIcon from "src/assets/icons/more.png";
import * as styles from "src/elements/modal.m.scss";
import { validatePassword } from "@/validators/profileValidations";

interface ChangePassProps {
  onSubmit: (password: string, repeatPasswordError: string) => void;
  error?: string | null;
}

function ChangePass({ onSubmit, error }: ChangePassProps) {
  const [password, setOldPassword] = useState("");
  const [repeatPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const repeatPasswordError = validatePassword(repeatPassword);

    if (passwordError || repeatPasswordError) {
      return;
    }

    onSubmit(password, repeatPassword);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText
        type="password"
        label=" Password"
        value={password}
        onChange={setOldPassword}
        validate={validatePassword}
        required
        placeholder=""
        icon={passIcon}
      />

      <InputText
        type="password"
        label="Repeat Password"
        value={repeatPassword}
        onChange={setNewPassword}
        validate={validatePassword}
        required
        placeholder=""
        icon={passIcon}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitBtn} aria-label="Change password button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ChangePass;
