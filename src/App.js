import "./App.css";
import MoviesList from "./components/MoviesList";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    // Response required time to be fetched, so we need then
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        // convert response format
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          // Extract required fileds
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        return setMovies(transformedMovies);
      });
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
}

export default App;
