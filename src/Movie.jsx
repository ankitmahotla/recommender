import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedMovies from "./components/RelatedMovies";

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  const fetchMovieDetails = async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      console.log(data);

      // Process the data and set the state with the fetched movie details
      setMovie({
        title: data.original_title,
        release_date: data.release_date,
        vote_average: data.vote_average,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        runtime: data.runtime, // Add runtime
        genres: data.genres, // Add genres
        tagline: data.tagline, // Add tagline
        overview: data.overview, // Add overview
        homepage: data.homepage, // Add homepage
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      // Handle errors (e.g., movie not found, API request error)
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="text-white p-4 md:pt-20">
      <div className="container mx-auto flex flex-col items-center md:flex-row space-x-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className=" w-80 h-auto rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold my-4">{movie.title}</h1>
          <p className="mt-2 text-xl">{movie.tagline}</p>
          <p className="mt-2">{movie.overview}</p>
          <p className="mt-4">Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}/10</p>
        </div>
      </div>
      <RelatedMovies />
    </div>
  );
}
