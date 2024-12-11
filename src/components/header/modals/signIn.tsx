import React, { useState } from "react";
import InputText from "src/elements/inputText";
import * as styles from "./modal.m.scss";

interface SignInProps {
  onSubmit: (username: string, password: string) => void;
}

function SignIn({ onSubmit }: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText type="text" label="Login" value={username} onChange={setUsername} required placeholder="" icon="" />
      <InputText type="password" label="Password" value={password} onChange={setPassword} required placeholder="" icon="" />
      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignIn;
