import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import Sidebar from "./components/Sidebar";
import { useTheme } from "./context";
import { getAllMovies } from "./data/movies";

export default function Page() {
  const movies = getAllMovies();
  const { theme } = useTheme();
  return (
    <div className={`h-full w-full ${theme === "dark" ? "dark" : ""}`}>
      <Header />
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <MovieList>
            {movies.length > 0 &&
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </MovieList>
        </div>
      </main>
    </div>
  );
}
