import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ data }) => {
  const title    = data.name || data.title || data.original_name || data.original_title;
  const year     = (data.release_date || data.first_air_date || "").slice(0, 4);
  const overview = data.overview?.slice(0, 200);
  const imageUrl = `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path || data.poster_path}`;

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[72vh] overflow-hidden">

      {/* Background — no scale animation, just fade in to avoid reflow jitter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </motion.div>

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 lg:px-10 pb-8 sm:pb-10 lg:pb-12">

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="flex items-center gap-2 mb-3 flex-wrap"
        >
          <span className="px-2.5 py-1 rounded-md bg-[#FF6B01] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm shadow-[#FF6B01]/40">
            {data.media_type}
          </span>
          {year && (
            <span className="px-2.5 py-1 rounded-md bg-[#353535] text-white/70 text-[11px] font-medium border border-white/10">
              {year}
            </span>
          )}
          {data.vote_average > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#353535] text-white/70 text-[11px] font-medium border border-white/10">
              <i className="ri-star-fill text-[#FF6B01] text-[10px]" />
              {data.vote_average.toFixed(1)}
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="w-full sm:w-[70%] lg:w-[55%] text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Overview */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="hidden sm:block w-full sm:w-[65%] lg:w-[50%] text-sm text-white/60 leading-relaxed mb-5 line-clamp-3"
        >
          {overview}...{" "}
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-[#FF6B01] hover:text-[#ff8533] font-medium transition-colors">
            more
          </Link>
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.37, duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="hidden sm:flex items-center gap-4 mb-5 text-xs text-white/40"
        >
          {(data.release_date || data.first_air_date) && (
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line text-[#FF6B01]" />
              {data.release_date || data.first_air_date}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <i className="ri-film-line text-[#FF6B01]" />
            {data.media_type?.toUpperCase()}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="flex items-center gap-3"
        >
          <Link
            to={`/${data.media_type}/details/${data.id}/trailer`}
            className="group flex items-center gap-2 bg-[#FF6B01] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-sm hover:bg-[#e55f00] transition-all duration-200 shadow-lg shadow-[#FF6B01]/30"
          >
            <i className="ri-play-fill text-base group-hover:scale-110 transition-transform" />
            Watch Trailer
          </Link>
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="flex items-center gap-2 bg-[#353535]/80 backdrop-blur-sm text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm hover:bg-[#454545] transition-all duration-200 border border-white/10"
          >
            <i className="ri-information-line text-base" />
            <span className="hidden sm:inline">More Info</span>
          </Link>
        </motion.div>
      </div>

      {/* Poster — xl only */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{ willChange: "transform, opacity" }}
        className="absolute right-12 bottom-10 hidden xl:block"
      >
        {data.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
            alt={title}
            className="w-28 rounded-2xl shadow-2xl shadow-black/70 border border-white/10 object-cover"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Header;