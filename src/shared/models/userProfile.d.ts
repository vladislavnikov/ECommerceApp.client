import { CartItem } from "./cartItems";

export interface UserProfile {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  phoneNumber: string;
  address: string;
  profileImage: string;
  cart: CartItem[];
}
