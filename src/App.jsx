import { Route, BrowserRouter, Routes } from "react-router-dom";
import Movie from "./Movie";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:movieId" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}
