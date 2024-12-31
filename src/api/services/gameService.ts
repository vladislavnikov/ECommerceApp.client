import apiEndpoints from "src/api.endpoints";
import { Game } from "src/shared/models/game";
import apiRequest from "src/api/services/apiRequest";

export const fetchTopGames = (): Promise<Game[]> => {
  return apiRequest<Game[]>(apiEndpoints.gamesMock);
};

export const searchGames = (text: string): Promise<Game[]> => {
  return apiRequest<Game[]>(apiEndpoints.searchUrl(text));
};
