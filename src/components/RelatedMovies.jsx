import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RelatedMovies() {
  const { movieId } = useParams();
  const [relatedMovies, setRelatedMovies] = useState([]);

  const fetchRelatedMovies = async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch related movies");
      }

      const data = await response.json();
      console.log(data);

      // Set the state with the fetched related movies
      setRelatedMovies(data.results);
    } catch (error) {
      console.error("Error fetching related movies:", error);
      // Handle errors (e.g., API request error)
    }
  };

  useEffect(() => {
    fetchRelatedMovies();
  }, [movieId]);

  return (
    <div className=" text-white p-4 ">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold my-4">Related Movies</h2>
        {relatedMovies.length === 0 ? (
          <p className="text-xl">No recommended movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedMovies.map((movie, index) => (
              <Link
                to={`/${movie.id}`}
                key={index}
                className="bg-gray-900 rounded-lg p-4 mx-6 sm:mx-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use the correct image URL
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {movie.release_date}{" "}
                  {/* You can format this date if needed */}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
