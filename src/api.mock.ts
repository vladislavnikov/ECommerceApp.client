import webpackMockServer from "webpack-mock-server";
import apiEndpoints from "./api.endpoints";

const mockData = {
  id: 1,
  firstName: "Will",
  lastName: "Smith",
  email: "willsmith321@gmail.com",
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

export default webpackMockServer.add((app) => {
  app.get(apiEndpoints.testMock, (_req, res) => res.json(mockData));

  app.get(apiEndpoints.gamesMock, (_req, res) => res.json(mockTopGames));

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
});
