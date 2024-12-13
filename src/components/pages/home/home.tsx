import Categories from "@/components/pages/home/categories/categories";
import NewGames from "@/components/pages/home/newGames/newGames";
import SearchBar from "@/components/pages/home/searchBar/searchBar";

function Home({ user, setSignInOpen }: { user: string | null; setSignInOpen: (open: boolean) => void }) {
  return (
    <div>
      <SearchBar />
      <Categories user={user} setSignInOpen={setSignInOpen} />
      <NewGames />
    </div>
  );
}

export default Home;
