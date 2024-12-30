import { signInPath, signUpPath } from "src/constants/urls";

const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export const fetchSignIn = (username: string, password: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(signInPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const searchGames = (username: string, password: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(signUpPath, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};
