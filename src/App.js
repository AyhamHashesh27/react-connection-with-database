import "./App.css";
import MoviesList from "./components/MoviesList";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  // To inform the user that something is happening in the background.
  const [isLoaing, setIsLoaing] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    // Clear
    setError(null);
    try {
      setIsLoaing(true);
      // Response required time to be fetched, so we need then
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      // convert response format
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        // Extract required fileds
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoaing(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  let content = <p>Found no movies.</p>;
  if (error) {
    content = { error };
  }
  if (isLoaing) {
    content = <p>Loading...</p>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
