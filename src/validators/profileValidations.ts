export const validateUsername = (value: string) => (value.length < 3 ? "Username must be at least 3 characters long" : null);

export const validateDescription = (value: string) => (value.length > 100 ? "Description cannot exceed 100 characters" : null);

export const validatePassword = (value: string) => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return null;
};

export function validateAddress(address: string): string | null {
  if (!address) {
    return "Address is required.";
  }
  if (address.length < 5) {
    return "Address must be at least 5 characters long.";
  }
  if (!/^[a-zA-Z0-9\s,.'-]*$/.test(address)) {
    return "Address contains invalid characters.";
  }
  return null;
}

export function validatePhoneNumber(phoneNumber: string): string | null {
  if (!phoneNumber) {
    return "Phone number is required.";
  }
  if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
    return "Phone number must be a valid international number (e.g., +123456789).";
  }
  return null;
}
