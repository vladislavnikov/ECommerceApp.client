import { useState } from "react";
import * as styles from "./inputText.m.scss";

interface InputTextProps {
  type: "text" | "password" | "email";
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  validate?: (value: string) => string | null;
  icon?: string;
}

function InputText({ type, label, value, onChange, onBlur, placeholder, required = false, errorMessage, validate, icon }: InputTextProps) {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
    if (onBlur) onBlur();
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={label} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        {icon && <img src={icon} alt={`${label} icon`} className={styles.inputIcon} />}
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
