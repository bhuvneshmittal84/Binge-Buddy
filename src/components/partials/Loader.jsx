import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#111111] gap-5">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-2xl bg-[#FF6B01] flex items-center justify-center shadow-2xl shadow-[#FF6B01]/40"
      >
        <i className="ri-tv-2-line text-white text-2xl" />
      </motion.div>

      {/* Sliding bar */}
      <div className="w-40 h-0.5 bg-[#353535] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#FF6B01] rounded-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <p className="text-white/25 text-xs tracking-widest uppercase">Loading</p>
    </div>
  );
};

export default Loader;
