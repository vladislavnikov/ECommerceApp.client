import React, { useState } from "react";
import InputText from "src/elements/inputText";
import idCardIcon from "src/assets/icons/idCard.png";
import passIcon from "src/assets/icons/resetPassword.svg";
import * as styles from "./modal.m.scss";

interface SignUpProps {
  onSubmit: (username: string, password: string) => void;
}

function SignUp({ onSubmit }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = "Password must contain both letters and numbers.";
    }
    if (repeatPassword !== password) {
      newErrors.repeatPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit(username, password);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <InputText type="text" label="Login" value={username} onChange={setUsername} required placeholder="" icon={idCardIcon} />
      {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}

      <InputText type="password" label="Password" value={password} onChange={setPassword} required placeholder="" icon={passIcon} />
      {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

      <InputText
        type="password"
        label="Repeat Password"
        value={repeatPassword}
        onChange={setRepeatPassword}
        required
        placeholder=""
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
