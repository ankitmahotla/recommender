import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedMovies from "./components/RelatedMovies";

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submittedRating, setSubmittedRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewSubmit = () => {
    localStorage.setItem(
      `movieReview-${movieId}`,
      JSON.stringify({ rating, review })
    );
    setSubmittedRating(rating);
    setSubmittedReview(review);
    setRating(0);
    setReview("");
  };

  useEffect(() => {
    const storedReview = localStorage.getItem(`movieReview-${movieId}`);
    if (storedReview) {
      const { rating: storedRating, review: storedReviewText } =
        JSON.parse(storedReview);
      setSubmittedRating(storedRating);
      setSubmittedReview(storedReviewText);
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  }, [movieId, rating, review]);

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
      <div className="my-10 container mx-auto flex flex-col md:flex-row justify-between space-y-6 px-6">
        {isSubmitted ? (
          <div>
            <p className="text-xl">Your Rating: {submittedRating}/10</p>
            <p className="text-xl">Your Review: {submittedReview}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-6">
              <p className="text-xl">Rate The Movie:</p>
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={handleRatingChange}
                className="w-14 h-8 px-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex items-center space-x-6">
              <p className="text-xl">Review:</p>
              <textarea
                value={review}
                onChange={handleReviewChange}
                className="w-full h-24 px-2 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
          </>
        )}
      </div>
      {!isSubmitted && (
        <div className="container mx-auto flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-slate-400"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      )}
      <RelatedMovies />
    </div>
  );
}
