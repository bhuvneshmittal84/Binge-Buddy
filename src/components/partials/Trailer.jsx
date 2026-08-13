import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
      >
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-xl bg-[#353535]/80 hover:bg-[#FF6B01]/20 border border-white/10 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all z-10"
        >
          <i className="ri-close-line text-xl" />
        </button>

        {/* Player */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80"
        >
          {ytvideo ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${ytvideo.key}?autoplay=1&rel=0&modestbranding=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full flex items-center justify-center bg-[#1c1c1c]">
              <div className="text-center">
                <i className="ri-film-line text-[#FF6B01] text-5xl mb-3 block" />
                <p className="text-white/60 text-sm">No trailer available</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Trailer;