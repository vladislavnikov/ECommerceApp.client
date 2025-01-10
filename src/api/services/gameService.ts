import apiEndpoints from "src/api.endpoints";
import { Game } from "src/shared/models/game";
import apiRequest from "src/api/services/apiRequest";
import { sortingParams } from "@/shared/models/sortingParams";

export const fetchTopGames = (): Promise<Game[]> => {
  return apiRequest<Game[]>(apiEndpoints.gamesMock);
};

export const searchGames = (text: string): Promise<Game[]> => {
  return apiRequest<Game[]>(apiEndpoints.searchUrl(text));
};

export const getProducts = (params: sortingParams): Promise<Game[]> => {
  const queryParams: Record<string, string> = {};

  if (params.sortType) queryParams.sortType = params.sortType;
  if (params.sortDir) queryParams.sortDir = params.sortDir;
  if (params.genre) queryParams.genre = params.genre;
  if (params.ageRating) queryParams.ageRating = params.ageRating;
  if (params.category) queryParams.category = params.category;

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${apiEndpoints.getProducts}?${queryString}`;

  return apiRequest<Game[]>(url);
};
