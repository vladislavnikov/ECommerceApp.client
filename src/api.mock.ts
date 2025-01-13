import webpackMockServer from "webpack-mock-server";
import apiEndpoints from "./api.endpoints";
import { mockData, mockTopGames, mockProducts } from "./mockData";

export default webpackMockServer.add((app) => {
  app.get(apiEndpoints.testMock, (_req, res) => res.json(mockData));

  app.get(apiEndpoints.gamesMock, (_req, res) => res.json(mockTopGames));

  app.get(apiEndpoints.getProducts, (req, res) => {
    const { sortType, sortDir, genre, ageRating, category } = req.query;

    let filteredProducts = [...mockProducts];

    if (category && typeof category === "string") {
      filteredProducts = filteredProducts.filter((product) => product.platforms.includes(category.toLowerCase()));
    }

    if (genre && typeof genre === "string") {
      filteredProducts = filteredProducts.filter((product) => product.genre && product.genre.toLowerCase() === genre.toLowerCase());
    }

    if (ageRating && typeof ageRating === "string") {
      filteredProducts = filteredProducts.filter((product) => product.ageRating >= parseInt(ageRating, 10));
    }

    const validSortFields = ["price", "rating", "title"] as const;
    type SortField = (typeof validSortFields)[number];

    if (sortType && typeof sortType === "string" && validSortFields.includes(sortType as SortField)) {
      const sortField = sortType as SortField;

      filteredProducts.sort((a, b) => {
        const fieldA = sortField === "price" ? parseFloat(a[sortField]) : a[sortField];
        const fieldB = sortField === "price" ? parseFloat(b[sortField]) : b[sortField];

        if (sortDir === "desc") {
          if (fieldB > fieldA) {
            return 1;
          }
          if (fieldB < fieldA) {
            return -1;
          }
          return 0;
        }
        if (fieldA > fieldB) {
          return 1;
        }
        if (fieldA < fieldB) {
          return -1;
        }
        return 0;
      });
    }

    res.json(filteredProducts);
  });

  app.get(apiEndpoints.searchMock, (req, res) => {
    const searchText = typeof req.query.text === "string" ? req.query.text : "";
    const results = mockTopGames.filter((game) => game.title.toLowerCase().includes(searchText.toLowerCase()));
    res.json(results);
  });

  app.post(apiEndpoints.signInPath, (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      res.status(200).json({ message: "SignIn successful" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  });

  app.put(apiEndpoints.signUpPath, (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      res.status(201).json({ message: "SignUp successful" });
    } else {
      res.status(400).json({ message: "SignUp failed. Please try again." });
    }
  });

  app.get(apiEndpoints.getProfile, (_req, res) => res.json(mockData));

  app.post(apiEndpoints.saveProfile, (req, res) => {
    const { firstName, lastName, email, phoneNumber, address } = req.body;

    if (firstName && lastName && email && phoneNumber && address) {
      mockData.firstName = firstName;
      mockData.lastName = lastName;
      mockData.email = email;
      mockData.phoneNumber = phoneNumber;
      mockData.address = address;

      res.status(200).json({ message: "Profile saved successfully!" });
    } else {
      res.status(400).json({ message: "Failed to save profile. All fields are required." });
    }
  });

  app.put(apiEndpoints.changePassword, (req, res) => {
    const { newPassword, repeatNewPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required." });
    }

    if (!repeatNewPassword) {
      return res.status(400).json({ message: "Repeat new password is required." });
    }

    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    return res.status(200).json({ message: "Password changed successfully!" });
  });

  app.post(apiEndpoints.uploadProfileImage, (_req, res) => {
    setTimeout(() => {
      res.status(200).json({
        imageUrl: "https://via.placeholder.com/150",
      });
    }, 1000);
  });
});
