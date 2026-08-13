import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#111111] px-6 text-center gap-6">
      {/* Big 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <span className="text-[120px] sm:text-[160px] font-black text-[#353535] leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF6B01] flex items-center justify-center shadow-2xl shadow-[#FF6B01]/40">
            <i className="ri-film-line text-white text-3xl" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-3"
      >
        <h2 className="text-white text-2xl sm:text-3xl font-bold">Page Not Found</h2>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-[#FF6B01] hover:bg-[#e55f00] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#FF6B01]/30 mt-2"
      >
        <i className="ri-home-line" />
        Back to Home
      </motion.button>
    </div>
  );
};

export default Notfound;
