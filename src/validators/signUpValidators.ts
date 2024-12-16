export const validateUsername = (value: string): string | null => {
  if (!value) return "Username is required.";
  if (value.length < 4) return "Username must be at least 4 characters.";
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "Password must contain both letters and numbers.";
  }
  return null;
};

export const validateRepeatPassword = (password: string, repeatPassword: string): string | null => {
  if (repeatPassword !== password) return "Passwords do not match.";
  return null;
};
