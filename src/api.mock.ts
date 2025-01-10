import webpackMockServer from "webpack-mock-server";
import apiEndpoints from "./api.endpoints";

const mockData = {
  id: 1,
  username: "wills",
  firstName: "Will",
  lastName: "Smith",
  email: "willsmith321@gmail.com",
  phoneNumber: "123-456-7890",
  description: "Test desc",
  address: "123 Main Street, Springfield, USA",
  profileImage: "src/assets/icons/resetPassword.svg",
};

const mockTopGames = [
  {
    id: 1,
    title: "Overwatch",
    price: "23.99",
    rating: 5,
    ageRating: 12,
    cover: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
    platforms: ["pc"],
    releaseDate: "2024-11-28",
    description: "Overwatch was a 2016 team-based online multiplayer first-person shooter video game by Blizzard Entertainment...",
  },
  {
    id: 2,
    title: "Minecraft",
    price: "25.99",
    rating: 4.5,
    ageRating: 3,
    cover: "https://m.media-amazon.com/images/M/MV5BNjQzMDlkNDctYmE3Yi00ZWFiLTlmOWYtMjI4MzQ4Y2JhZjY2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    platforms: ["pc", "ps5", "xbox"],
    releaseDate: "2024-11-27",
    description: "Minecraft is a 2011 sandbox game developed and published by Mojang Studios...",
  },
  {
    id: 3,
    title: "Terraria",
    price: "4.99",
    rating: 4,
    ageRating: 6,
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1a/Terraria_Steam_artwork.jpg",
    platforms: ["pc", "ps5", "xbox"],
    releaseDate: "2024-11-26",
    description: "Terraria is a 2011 action-adventure sandbox game developed by Re-Logic...",
  },
];

const mockProducts = [
  {
    id: 1,
    title: "Overwatch",
    price: "23.99",
    rating: 5,
    ageRating: 12,
    cover: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
    platforms: ["pc"],
    releaseDate: "2024-11-28",
    description: "Overwatch was a 2016 team-based online multiplayer first-person shooter video game by Blizzard Entertainment...",
    genre: "Shooter",
  },
  {
    id: 2,
    title: "Minecraft",
    price: "25.99",
    rating: 4.5,
    ageRating: 3,
    cover: "https://m.media-amazon.com/images/M/MV5BNjQzMDlkNDctYmE3Yi00ZWFiLTlmOWYtMjI4MzQ4Y2JhZjY2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    platforms: ["pc", "ps5", "xbox"],
    releaseDate: "2024-11-27",
    description: "Minecraft is a 2011 sandbox game developed and published by Mojang Studios...",
    genre: "Survive",
  },
  {
    id: 3,
    title: "Terraria",
    price: "4.99",
    rating: 4,
    ageRating: 6,
    cover: "https://upload.wikimedia.org/wikipedia/en/1/1a/Terraria_Steam_artwork.jpg",
    platforms: ["pc", "ps5", "xbox"],
    releaseDate: "2024-11-26",
    description: "Terraria is a 2011 action-adventure sandbox game developed by Re-Logic...",
    genre: "Survive",
  },
  {
    id: 4,
    title: "Battlefield 1",
    price: "23.99",
    rating: 4,
    ageRating: 12,
    cover: "https://www.playstation.com/en-us/games/battlefield-1/",
    platforms: ["pc"],
    releaseDate: "2024-11-28",
    description: "Battlefield 1 is a first-person shooter game developed by DICE...",
    genre: "Shooter",
  },
  {
    id: 5,
    title: "CS:GO",
    price: "10",
    rating: 2,
    ageRating: 12,
    cover: "https://blog.counter-strike.net/",
    platforms: ["pc"],
    releaseDate: "2024-11-30",
    description:
      "Counter-Strike: Global Offensive is a 2012 multiplayer tactical first-person shooter developed by Valve and Hidden Path Entertainment....",
    genre: "Shooter",
  },
  {
    id: 6,
    title: "Genshin Impact",
    price: "14.99",
    rating: 4,
    ageRating: 6,
    cover: "https://store.epicgames.com/en-US/p/genshin-impact",
    platforms: ["pc"],
    releaseDate: "2024-11-31",
    description: "Genshin Impact is a 2020 action role-playing video game produced by MiHoYo/HoYoverse....",
    genre: "Arcade",
  },
];

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
