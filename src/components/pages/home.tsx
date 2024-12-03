import Categories from "@/elements/categories";
import NewGames from "@/elements/newGames";
import SearchBar from "@/elements/searchBar";

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
