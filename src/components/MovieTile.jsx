import { Link } from "react-router-dom";

export default function MovieTile({ key, movie, toggleFavorite }) {
  return (
    <div key={key} className="bg-gray-900 rounded-lg p-4 relative mx-6 sm:mx-0">
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
        <p className="text-sm text-gray-400 mt-1">{movie.release_date}</p>
      </Link>
    </div>
  );
}
