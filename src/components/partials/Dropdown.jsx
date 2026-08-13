import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ title, options, func }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(title);
  const ref = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    func({ target: { value } }); // mimic select event
  };

  return (
    <div ref={ref} className="relative z-[999] w-fit">
      
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          bg-[#353535]/60 border border-white/10
          text-white/70 text-xs font-semibold uppercase tracking-wider
          px-3 py-2.5 rounded-xl
          hover:bg-[#353535] hover:border-[#FF6B01]/50
          focus:border-[#FF6B01]
          transition-all duration-200
        "
      >
        {selected}
        <i className={`ri-arrow-down-s-line transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="
              absolute left-0 mt-2 w-full
              bg-[#1c1c1c] border border-[#FF6B01]/30
              rounded-xl shadow-lg overflow-hidden
            "
          >
            {options.map((o, i) => (
              <div
                key={i}
                onClick={() => handleSelect(o)}
                className="
                  px-3 py-2 text-sm text-white cursor-pointer
                  hover:bg-[#FF6B01]/20 transition
                "
              >
                {o.toUpperCase()}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;