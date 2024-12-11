import React, { useState } from "react";
import * as styles from "./inputText.m.scss";

interface InputTextProps {
  type: "text" | "password" | "email";
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  validate?: (value: string) => string | null;
  icon?: React.ReactNode;
}

function InputText({ type, label, value, onChange, placeholder, required = false, errorMessage, validate, icon }: InputTextProps) {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={label} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          id={label}
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (validate) setError(validate(e.target.value));
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={styles.formInput}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {errorMessage && !error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default InputText;
