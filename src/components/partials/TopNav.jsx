import axios from "../../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NoImage from "../../../public/No_image.jpg";

function TopNav({ hideLogo = false }) {
  const [querry, setquerry]       = useState("");
  const [searches, setsearches]   = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${querry}`);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { GetSearches(); }, [querry]);

  const showDropdown = isFocused && querry.length > 0 && searches.length > 0;

  return (
    <div className="relative w-full max-w-xl flex  items-center gap-3">

      {/* Logo — mobile only, hidden when inside PageLayout */}
      {!hideLogo && (
        <Link to="/" className="lg:hidden flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#FF6B01] flex items-center justify-center">
            <i className="ri-tv-2-line text-white text-xs" />
          </div>
          <span className="text-white font-bold text-sm tracking-tight hidden sm:block">
            Binge<span className="text-[#FF6B01]">Buddy</span>
          </span>
        </Link>
      )}

      {/* Search bar */}
      <div className="relative flex-1 min-w-0">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 0 1.5px #FF6B01, 0 4px 20px rgba(255,107,1,0.12)"
              : "0 0 0 1px rgba(255,255,255,0.07)",
          }}
          className="flex items-center gap-2.5 bg-[#353535]/60 rounded-xl px-3 sm:px-4 py-2.5"
        >
          <motion.i
            animate={{ color: isFocused ? "#FF6B01" : "#ffffff50" }}
            className="ri-search-line text-base sm:text-lg flex-shrink-0"
          />
          <input
            ref={inputRef}
            onChange={(e) => setquerry(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            value={querry}
            type="text"
            placeholder="Search movies, shows, people..."
            className="bg-transparent flex-1 text-sm text-white placeholder:text-white/30 outline-none border-none min-w-0"
          />
          <AnimatePresence>
            {querry.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setquerry(""); inputRef.current?.focus(); }}
                className="text-white/40 hover:text-white transition-colors shrink-0"
              >
                <i className="ri-close-circle-fill text-lg" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-[calc(100%+6px)] left-0 right-0 max-h-[55vh] overflow-auto rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl shadow-black/80 z-[9999]"
            >
              {searches.map((s, i) => (
                <Link
                  key={i}
                  to={`/${s.media_type === "movie" || s.media_type === "tv" ? s.media_type : "people"}/details/${s.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/8 last:border-0 group"
                >
                  <div className="w-10 h-13 sm:w-12 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#353535]">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        s.poster_path || s.profile_path || s.backdrop_path
                          ? `https://image.tmdb.org/t/p/w200/${s.poster_path || s.profile_path || s.backdrop_path}`
                          : NoImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-white text-sm font-medium truncate group-hover:text-[#FF6B01] transition-colors">
                      {s.name || s.title || s.original_name || s.original_title}
                    </span>
                    <span className="text-white/40 text-xs mt-0.5 capitalize">
                      {s.media_type || "person"}
                      {s.release_date || s.first_air_date ? ` · ${(s.release_date || s.first_air_date).slice(0, 4)}` : ""}
                    </span>
                  </div>
                  {s.vote_average > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      <i className="ri-star-fill text-[#FF6B01] text-xs" />
                      <span className="text-white/60 text-xs">{s.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TopNav;