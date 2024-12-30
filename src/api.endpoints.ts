export const apiEndpoints = {
  testMock: "/api/testMock",
  gamesMock: "/api/products/top",
  searchMock: "/api/search",
};

export const signInPath = "/api/auth/signIn";

export const signUpPath = "/api/auth/signUp";

export const searchUrl = (text: string) => `/api/search?text=${text}`;
