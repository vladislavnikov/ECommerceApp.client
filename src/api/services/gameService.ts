import { GameCardProps } from "src/shared/models/game.t";

// Generic API request handler
const apiRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export const fetchTopGames = (): Promise<GameCardProps[]> => {
  return apiRequest<GameCardProps[]>("/api/products/top");
};

export const searchGames = (text: string): Promise<GameCardProps[]> => {
  return apiRequest<GameCardProps[]>(`/api/search?text=${text}`);
};
