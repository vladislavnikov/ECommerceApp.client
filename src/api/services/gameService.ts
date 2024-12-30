import { topProductsPath, searchUrl } from "src/constants/urls";
import { Game } from "src/shared/models/game";

const apiRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export const fetchTopGames = (): Promise<Game[]> => {
  return apiRequest<Game[]>(topProductsPath);
};

export const searchGames = (text: string): Promise<Game[]> => {
  return apiRequest<Game[]>(searchUrl(text));
};
