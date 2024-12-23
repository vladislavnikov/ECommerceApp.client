import React, { useState } from "react";
import InputText from "src/elements/inputText";
import idCardIcon from "src/assets/icons/idCard.png";
import passIcon from "src/assets/icons/more.png";
import * as styles from "src/elements/modal.m.scss";

interface SignInProps {
  onSubmit: (username: string, password: string) => void;
}

function SignIn({ onSubmit }: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateUsername = (value: string) => {
    if (!value) return "Username is required.";
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setError(usernameError || passwordError);
      return;
    }

    setError(null);
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText
        type="text"
        label="Login"
        value={username}
        onChange={setUsername}
        validate={validateUsername}
        required
        placeholder=""
        icon={idCardIcon}
      />

      <InputText
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        validate={validatePassword}
        required
        placeholder=""
        icon={passIcon}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitBtn} aria-label="Sign in button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignIn;
