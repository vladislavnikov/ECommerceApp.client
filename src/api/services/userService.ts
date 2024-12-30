import { signInPath, signUpPath } from "src/api.endpoints";
import apiRequest from "src/api/services/apiRequest";

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
