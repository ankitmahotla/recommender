import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query) {
      // Make a request to the TMDb API to search for movies using fetch
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results.slice(0, 5));
          setShowDropdown(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between">
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            Recommender
          </Link>
          {location.pathname === "/" && (
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search For Movies"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full md:w-auto"
              />
            </div>
          )}
        </div>
      </div>

      {location.pathname === "/" && showDropdown && (
        <div className="w-full p-4 bg-gray-800 rounded-md mt-1 shadow-lg">
          {searchResults.length ? (
            <h1 className="text-xl text-white p-4">Search Results:</h1>
          ) : (
            <h1 className="text-xl text-white p-4">No Movies Found</h1>
          )}
          {searchResults.map((result, index) => (
            <div key={result.id}>
              <Link
                onClick={() => {
                  setShowDropdown(false);
                  setSearchTerm("");
                }}
                to={`/${result.id}`}
                className="block text-white text-lg py-2 px-4  hover:bg-gray-700 rounded-md transition-colors"
              >
                {result.title}
              </Link>
              {index < searchResults.length - 1 && (
                <hr className="my-2 border-gray-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
