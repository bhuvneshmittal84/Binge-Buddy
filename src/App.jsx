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
import Login from "./components/Login";
import Register from "./components/Register";
import Watchlist from "./components/Watchlist";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <div className="w-screen h-screen bg-[#1F1E24] flex">
          <Routes>
            {/* Public routes */}
            <Route path="/"         element={<Home />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/popular"  element={<Popular />} />
            <Route path="/movies"   element={<Movies />} />
            <Route path="/movie/details/:id" element={<Moviedetails />}>
              <Route path="/movie/details/:id/trailer" element={<Trailer />} />
            </Route>
            <Route path="/tvshows"  element={<TVShows />} />
            <Route path="/tv/details/:id" element={<TvDetails />}>
              <Route path="/tv/details/:id/trailer" element={<Trailer />} />
            </Route>
            <Route path="/peoples"            element={<Peoples />} />
            <Route path="/people/details/:id" element={<PeopleDetails />} />
            <Route path="/aboutus"   element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />

            {/* Protected routes */}
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
