import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NoImage from "../../../public/No_image.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 pt-4">
      {data.map((c, i) => {
        const name = c.name || c.title || c.original_name || c.original_title;
        const imagePath = c.poster_path || c.profile_path || c.backdrop_path;
        const score = c.vote_average ? (c.vote_average * 10).toFixed() : null;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 12) * 0.04, duration: 0.3 }}
          >
            <Link
              to={`/${c.media_type || title}/details/${c.id}`}
              className="group block relative rounded-2xl overflow-hidden bg-[#1c1c1c] border border-white/5 hover:border-[#FF6B01]/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#FF6B01]/10"
            >
              {/* Poster */}
              <div className="relative w-full aspect-[2/3] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={
                    imagePath
                      ? `https://image.tmdb.org/t/p/w342/${imagePath}`
                      : NoImage
                  }
                  alt={name}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FF6B01]/90 text-white text-xs font-bold">
                    <i className="ri-play-circle-fill text-sm" />
                    View Details
                  </span>
                </div>

                {/* Score badge */}
                {score && (
                  <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#FF6B01] shadow-lg shadow-[#FF6B01]/40 flex  items-center justify-center">
                    <span className="text-white text-[10px] font-black leading-none">{score}</span>
                    <sup className="text-white text-[7px] leading-none">%</sup>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="p-2.5">
                <h3 className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#FF6B01] transition-colors">
                  {name}
                </h3>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;
