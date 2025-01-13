import Categories from "@/components/pages/home/categories/categories";
import NewGames from "@/components/pages/home/newGames/newGames";
import SearchBar from "@/elements/searchBar/searchBar";

function Home() {
  return (
    <div>
      <SearchBar withDropdown />
      <Categories />
      <NewGames />
    </div>
  );
}

export default Home;
