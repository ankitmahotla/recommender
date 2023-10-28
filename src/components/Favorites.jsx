import { useState, useEffect } from "react";

import MovieTile from "./MovieTile";

const Favorites = ({ favorites, toggleFavorite }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
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
        {favoriteMovies.length > 0 &&
          favoriteMovies.map((favoriteMovie) => {
            return (
              <MovieTile
                key={favoriteMovie.id}
                movie={favoriteMovie}
                toggleFavorite={toggleFavorite}
              />
            );
          })}
      </div>

      {!favoriteMovies.length && (
        <p className="text-lg">
          No favorite movies yet. Add some by clicking the star icon.
        </p>
      )}
    </div>
  );
};

export default Favorites;
