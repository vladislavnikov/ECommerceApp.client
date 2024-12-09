import Categories from "@/components/pages/home/categories/categories";
import NewGames from "@/components/pages/home/newGames/newGames";
import SearchBar from "@/components/pages/home/searchBar/searchBar";

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
