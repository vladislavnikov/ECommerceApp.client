import React, { useState } from "react";
import InputText from "src/elements/inputText";
import idCardIcon from "src/assets/icons/idCard.png";
import passIcon from "src/assets/icons/resetPassword.svg";
import { validateUsername, validatePassword, validateRepeatPassword } from "src/validators/signUpValidators";
import * as styles from "./modal.m.scss";

interface SignUpProps {
  onSubmit: (username: string, password: string) => void;
}

function SignUp({ onSubmit }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBlur = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === "username") newErrors.username = validateUsername(value) || "";
    if (field === "password") newErrors.password = validatePassword(value) || "";
    if (field === "repeatPassword") {
      newErrors.repeatPassword = validateRepeatPassword(password, value) || "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(username) || "",
      password: validatePassword(password) || "",
      repeatPassword: validateRepeatPassword(password, repeatPassword) || "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText
        type="text"
        label="Login"
        value={username}
        onChange={setUsername}
        onBlur={() => handleBlur("username", username)}
        required
        placeholder="Enter your username"
        icon={idCardIcon}
      />
      {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}

      <InputText
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        onBlur={() => handleBlur("password", password)}
        required
        placeholder="Enter your password"
        icon={passIcon}
      />
      {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

      <InputText
        type="password"
        label="Repeat Password"
        value={repeatPassword}
        onChange={setRepeatPassword}
        onBlur={() => handleBlur("repeatPassword", repeatPassword)}
        required
        placeholder="Repeat your password"
        icon={passIcon}
      />
      {errors.repeatPassword && <p className={styles.errorMessage}>{errors.repeatPassword}</p>}

      <div className={styles.submitWrapper}>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignUp;
