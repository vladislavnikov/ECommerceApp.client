export interface Game {
  id: number;
  title: string;
  cover?: string;
  releaseDate?: Date;
  description?: string;
  price: number;
  platforms: string[];
  rating: number;
  ageRating: number;
}
