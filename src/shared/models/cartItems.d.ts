export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  platform: string;
  availablePlatforms: string[];
  date: string;
}
