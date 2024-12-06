import Categories from "src/components/pages/home/homeComponents/categories";
import NewGames from "src/components/pages/home/homeComponents/newGames";
import SearchBar from "src/components/pages/home/homeComponents/searchBar";

function Home() {
  return (
    <div>
      <SearchBar />
      <Categories />
      <NewGames />
    </div>
  );
}

export default Home;
