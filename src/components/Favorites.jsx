import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = ({ movies, favorites, toggleFavorite }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Retrieve favorite movies from localStorage and parse them
    const favoritesJSON = localStorage.getItem("favorites");
    if (favoritesJSON) {
      const favorites = JSON.parse(favoritesJSON);
      setFavoriteMovies(favorites);
    }
  }, [favorites]);

  return (
    <div className="my-4">
      <h2 className="text-3xl font-bold mb-4">Favorite Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((favoriteMovie) => {
            const movie = movies.find((m) => m.id === favoriteMovie.id);
            if (!movie) {
              return null; // Skip if the movie is not found in the movies array
            }
            return (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-lg p-4 relative mx-6 sm:mx-0"
              >
                <span
                  className={`absolute top-4 right-6 cursor-pointer text-2xl text-yellow-400`}
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
            );
          })
        ) : (
          <p>No favorite movies yet. Add some by clicking the star icon.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
