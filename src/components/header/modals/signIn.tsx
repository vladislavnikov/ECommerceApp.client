import React, { useState } from "react";
import InputText from "src/elements/inputText";
import idCardIcon from "src/assets/icons/idCard.png";
import pass from "src/assets/icons/more.png";
import * as styles from "./modal.m.scss";

interface SignInProps {
  onSubmit: (username: string, password: string) => void;
}

function SignIn({ onSubmit }: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setError(null);
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText type="text" label="Login" value={username} onChange={setUsername} required placeholder="" icon={idCardIcon} />
      <InputText type="password" label="Password" value={password} onChange={setPassword} required placeholder="" icon={pass} />
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
