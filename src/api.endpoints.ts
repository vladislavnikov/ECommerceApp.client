const apiEndpoints = {
  testMock: "/api/testMock",
  gamesMock: "/api/products/top",
  searchMock: "/api/search",
  signInPath: "/api/auth/signIn",
  signUpPath: "/api/auth/signUp",
  searchUrl: (text: string) => `/api/search?text=${encodeURIComponent(text)}`,
  getProfile: "/api/getProfile",
  saveProfile: "/api/saveProfile",
  changePassword: "/api/changePassword",
  uploadProfileImage: "/api/uploadProfileImage",
  getProducts: "/api/products",
};

export default apiEndpoints;
