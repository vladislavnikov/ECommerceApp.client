import React, { useState } from "react";
import InputText from "src/elements/inputText";
import * as styles from "./modal.m.scss";

interface SignUpProps {
  onSubmit: (username: string, password: string) => void;
}

function SignUp({ onSubmit }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const validatePasswordMatch = (repeatValue: string) => (repeatValue !== password ? "Passwords do not match!" : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === repeatPassword) {
      onSubmit(username, password);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText type="text" label="Login" value={username} onChange={setUsername} required placeholder="" />
      <InputText type="password" label="Password" value={password} onChange={setPassword} required placeholder="" />
      <InputText
        type="password"
        label="Repeat Password"
        value={repeatPassword}
        onChange={setRepeatPassword}
        required
        placeholder=""
        validate={validatePasswordMatch}
      />
      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignUp;
