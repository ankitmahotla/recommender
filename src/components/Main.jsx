import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Favorites from "./Favorites";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize the favorites state from localStorage when the component mounts.
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    // Store the updated favorites list in localStorage.
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Update the favorites state.
    setFavorites(updatedFavorites);
  };

  const getMovies = (page) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gray-800 text-center text-white py-12">
      <div className="container mx-auto h-full">
        <Favorites
          movies={movies}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <h2 className="text-3xl font-bold my-6">Discover the Latest Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-4 mx-6 sm:mx-0 relative"
            >
              <span
                className={`absolute top-4 right-6 cursor-pointer text-2xl ${
                  favorites.some((fav) => fav.id === movie.id)
                    ? "text-yellow-400" // Change star color if in favorites
                    : "text-gray-300"
                }`}
                onClick={() => toggleFavorite(movie)}
              >
                ★
              </span>
              <Link to={`/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {movie.release_date}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-between m-6 items-center">
          <button
            onClick={handlePrevPageClick}
            className="flex items-center text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8"
              />
            </svg>{" "}
            Prev
          </button>
          <button
            onClick={handleNextPageClick}
            className="flex items-center text-xl"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
