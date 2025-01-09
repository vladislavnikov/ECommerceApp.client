import React, { useState } from "react";
import InputText from "src/elements/inputText";
import passIcon from "src/assets/icons/more.png";
import * as styles from "src/elements/modal.m.scss";
import { validatePassword } from "@/validators/profileValidations";

interface ChangePassProps {
  onSubmit: (newPassword: string, repeatNewPassword: string) => void;
  error?: string | null;
}

function ChangePass({ onSubmit, error }: ChangePassProps) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPasswordError = validatePassword(newPassword);
    const repeatNewPasswordError = validatePassword(repeatNewPassword);

    if (newPasswordError || repeatNewPasswordError) {
      return;
    }

    if (newPassword !== repeatNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    onSubmit(newPassword, repeatNewPassword);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText
        type="password"
        label="New Password"
        value={newPassword}
        onChange={setNewPassword}
        validate={validatePassword}
        required
        placeholder=""
        icon={passIcon}
      />

      <InputText
        type="password"
        label="Repeat New Password"
        value={repeatNewPassword}
        onChange={setRepeatNewPassword}
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
