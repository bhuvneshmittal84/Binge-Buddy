import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import SideNAv from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import NoImage from "../../public/No_image.jpg";

const typeColors = {
  movie: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  tv:    "bg-purple-500/20 text-purple-300 border-purple-500/30",
  people:"bg-green-500/20 text-green-300 border-green-500/30",
  person:"bg-green-500/20 text-green-300 border-green-500/30",
};

const typeIcons = {
  movie:  "ri-movie-2-fill",
  tv:     "ri-tv-fill",
  people: "ri-user-fill",
  person: "ri-user-fill",
};

function WatchlistCard({ item, onRemove }) {
  const name      = item.name || item.title || item.original_name || item.original_title;
  const imagePath = item.poster_path || item.profile_path || item.backdrop_path;
  const score     = item.vote_average ? (item.vote_average * 10).toFixed() : null;
  const year      = (item.release_date || item.first_air_date || "").slice(0, 4);
  const type      = item.media_type || item.savedType || "movie";
  const detailUrl = `/${type}/details/${item.id}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-[#1a1a1a] border border-white/6 rounded-2xl overflow-hidden hover:border-[#FF6B01]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF6B01]/8"
    >
      {/* Remove button */}
      <button
        id={`remove-watchlist-${item.id}`}
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
        title="Remove from watchlist"
      >
        <i className="ri-delete-bin-line text-sm" />
      </button>

      <Link to={detailUrl} className="block">
        {/* Poster */}
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={imagePath ? `https://image.tmdb.org/t/p/w342/${imagePath}` : NoImage}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {score && (
            <div className="absolute top-2 left-2 w-9 h-9 rounded-full bg-[#FF6B01] shadow-lg flex items-center justify-center">
              <span className="text-white text-[10px] font-black">{score}</span>
              <sup className="text-white text-[7px]">%</sup>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#FF6B01] transition-colors mb-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border capitalize ${typeColors[type] || typeColors.movie}`}>
              <i className={`${typeIcons[type] || "ri-film-line"} text-[9px]`} />
              {type === "people" || type === "person" ? "Person" : type === "tv" ? "TV Show" : "Movie"}
            </span>
            {year && (
              <span className="text-white/30 text-[10px]">{year}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Watchlist() {
  document.title = "My Watchlist – BingeBuddy";
  const { user, logout } = useAuth();
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const [filter, setFilter]     = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = ["all", "movie", "tv", "people"];
  const filtered = filter === "all"
    ? watchlist
    : watchlist.filter((item) => {
        const t = item.media_type || item.savedType || "movie";
        if (filter === "people") return t === "people" || t === "person";
        return t === filter;
      });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-screen h-screen bg-[#111111]">
      <SideNAv mobileOpen={drawerOpen} onMobileClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-50 shrink-0 bg-[#141414]/95 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 overflow-visible">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden shrink-0 w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all"
            >
              <i className="ri-menu-line text-lg" />
            </button>
            <div className="flex-1 min-w-0">
              <TopNav hideLogo />
            </div>
            {/* User chip */}
            <div className="shrink-0 flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FF6B01]/10 border border-[#FF6B01]/20 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-[#FF6B01] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold uppercase">{user.displayName?.[0]}</span>
                </div>
                <span className="text-white/80 text-xs font-medium">{user.displayName}</span>
              </div>
              <button
                id="logout-btn"
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 flex items-center justify-center text-white/40 hover:text-red-400 transition-all"
                title="Logout"
              >
                <i className="ri-logout-box-line text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8">
          {/* Page header */}
          <div className="pt-6 pb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-7 rounded-full bg-[#FF6B01]" />
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">My Watchlist</h1>
              <span className="px-2.5 py-1 bg-[#FF6B01]/15 border border-[#FF6B01]/25 text-[#FF6B01] text-xs font-bold rounded-lg">
                {watchlist.length}
              </span>
            </div>
            <p className="text-white/30 text-sm pl-4 ml-1">
              Saved titles across movies, TV shows, and people
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((f) => {
              const count = f === "all"
                ? watchlist.length
                : watchlist.filter((item) => {
                    const t = item.media_type || item.savedType || "movie";
                    if (f === "people") return t === "people" || t === "person";
                    return t === f;
                  }).length;
              return (
                <button
                  key={f}
                  id={`watchlist-filter-${f}`}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize border ${
                    filter === f
                      ? "bg-[#FF6B01]/15 text-[#FF6B01] border-[#FF6B01]/30"
                      : "bg-white/4 text-white/40 border-transparent hover:text-white/70 hover:bg-white/8"
                  }`}
                >
                  {f === "all" ? "🎬 All" : f === "movie" ? "🎥 Movies" : f === "tv" ? "📺 TV Shows" : "👤 People"}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    filter === f ? "bg-[#FF6B01]/20 text-[#FF6B01]" : "bg-white/8 text-white/30"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#FF6B01]/10 border border-[#FF6B01]/15 flex items-center justify-center mb-5">
                <i className="ri-bookmark-line text-[#FF6B01] text-3xl" />
              </div>
              <h2 className="text-white text-lg font-bold mb-2">
                {filter === "all" ? "Your watchlist is empty" : `No ${filter} titles saved`}
              </h2>
              <p className="text-white/30 text-sm max-w-xs">
                {filter === "all"
                  ? "Browse movies, TV shows, and people, then hit the bookmark icon to save them here."
                  : `Switch the filter or browse more ${filter === "tv" ? "TV shows" : filter}.`}
              </p>
              <Link
                to="/"
                className="mt-6 px-5 py-2.5 bg-[#FF6B01] hover:bg-[#e55f00] text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#FF6B01]/25"
              >
                Discover Content →
              </Link>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
            >
              <AnimatePresence>
                {filtered.map((item) => (
                  <WatchlistCard
                    key={item.id}
                    item={item}
                    onRemove={removeFromWatchlist}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
