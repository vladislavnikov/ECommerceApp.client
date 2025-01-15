export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRODUCTS: "/products",
  CART: "/cart",
  NOT_FOUND: "/404",
  PROFILE: "/profile",
  PRODUCT_CATEGORY: "/products/category/:category",

  CATEGORIES: {
    PC: "/products/category/pc",
    PLAYSTATION: "/products/category/playstation",
    XBOX: "/products/category/xbox",
  },
};

export interface Route {
  path: string;
  name: string;
}

export const PRODUCT_ROUTES: Route[] = [
  { path: ROUTES.CATEGORIES.PC, name: "PC" },
  { path: ROUTES.CATEGORIES.PLAYSTATION, name: "Playstation 5" },
  { path: ROUTES.CATEGORIES.XBOX, name: "Xbox One" },
];
