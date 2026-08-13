import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movie";
import TVShows from "./components/TVShows";
import Peoples from "./components/Peoples";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import TvDetails from "./components/TvDetails";
import PeopleDetails from "./components/PeopleDetails";
import Moviedetails from "./components/MovieDetails";
import Trailer from "./components/partials/Trailer";
import Notfound from "./components/partials/NotFound";

function App() {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movie/details/:id" element={<Moviedetails />}>
        <Route path="/movie/details/:id/trailer" element={<Trailer/>}></Route>
        </Route>
        <Route path="/tvshows" element={<TVShows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
         <Route path="/tv/details/:id/trailer" element={<Trailer/>}></Route>
         </Route>
        <Route path="/peoples" element={<Peoples />}></Route>
        <Route path="/people/details/:id" element={<PeopleDetails />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>
    </div> 
  );
}

export default App;
