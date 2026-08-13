import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/trending",  icon: "ri-fire-fill",    label: "Trending" },
  { to: "/popular",   icon: "ri-bard-fill",    label: "Popular"  },
  { to: "/movies",    icon: "ri-movie-2-fill", label: "Movies"   },
  { to: "/tvshows",   icon: "ri-tv-fill",      label: "TV Shows" },
  { to: "/peoples",   icon: "ri-team-fill",    label: "People"   },
];

const infoLinks = [
  { to: "/aboutus",   icon: "ri-information-fill", label: "About Us"   },
  { to: "/contactus", icon: "ri-phone-fill",        label: "Contact Us" },
];

function NavItem({ to, icon, label, compact = false, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (compact) {
    return (
      <Link to={to} className="flex flex-col items-center gap-0.5 flex-1 py-2">
        <i className={`${icon} text-xl transition-colors ${isActive ? "text-[#FF6B01]" : "text-white/40"}`} />
        <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-[#FF6B01]" : "text-white/30"}`}>
          {label}
        </span>
        {isActive && (
          <motion.div layoutId="mobileActive" className="w-1 h-1 rounded-full bg-[#FF6B01] mt-0.5" />
        )}
      </Link>
    );
  }

  return (
    <Link to={to} onClick={onClick}>
      <motion.div
        whileHover={{ x: 3 }}
        className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? "bg-[#FF6B01]/15 text-white border border-[#FF6B01]/25"
            : "text-white/50 hover:text-white hover:bg-white/5"
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="sidebarActive"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FF6B01] rounded-full"
          />
        )}
        <i className={`${icon} text-base transition-colors ${isActive ? "text-[#FF6B01]" : "text-white/30 group-hover:text-[#FF6B01]"}`} />
        <span>{label}</span>
        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6B01]" />}
      </motion.div>
    </Link>
  );
}

function SideNAv({ mobileOpen = false, onMobileClose }) {
  return (
    <>
      {/* ── Desktop sidebar — hidden below lg ── */}
      <aside className="hidden lg:flex w-[220px] xl:w-[240px] shrink-0 h-full flex-col bg-[#1c1c1c] border-r border-white/5 p-5 overflow-hidden">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 mb-8 px-1"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FF6B01] flex items-center justify-center shadow-lg shadow-[#FF6B01]/30">
            <i className="ri-tv-2-line text-white text-sm" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Binge<span className="text-[#FF6B01]">Buddy</span>
          </span>
        </motion.div>

        <div className="flex flex-col gap-0.5">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Discover</p>
          {navLinks.map((link, i) => (
            <motion.div key={link.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
              <NavItem {...link} />
            </motion.div>
          ))}
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-0.5">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Info</p>
          {infoLinks.map((link, i) => (
            <motion.div key={link.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.4 }}>
              <NavItem {...link} />
            </motion.div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="rounded-xl bg-[#FF6B01]/8 border border-[#FF6B01]/15 p-4">
            <p className="text-white/40 text-xs leading-relaxed">
              Powered by <span className="text-[#FF6B01] font-semibold">TMDB</span> — your cinematic companion.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Mobile bottom nav — always visible below lg ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1c]/96 backdrop-blur-md border-t border-white/8 flex items-center px-2 pb-safe">
        {navLinks.map((link) => (
          <NavItem key={link.to} {...link} compact />
        ))}
      </nav>

      {/* ── Mobile drawer — slides in when mobileOpen=true ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 z-[70] h-full w-[270px] bg-[#1c1c1c] border-r border-white/5 flex flex-col p-5 overflow-y-auto"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B01] flex items-center justify-center shadow-lg shadow-[#FF6B01]/30">
                    <i className="ri-tv-2-line text-white text-sm" />
                  </div>
                  <span className="text-white font-bold text-lg tracking-tight">
                    Binge<span className="text-[#FF6B01]">Buddy</span>
                  </span>
                </div>
                <button
                  onClick={onMobileClose}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-0.5">
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Discover</p>
                {navLinks.map((link) => (
                  <NavItem key={link.to} {...link} onClick={onMobileClose} />
                ))}
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex flex-col gap-0.5">
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold px-4 mb-2">Info</p>
                {infoLinks.map((link) => (
                  <NavItem key={link.to} {...link} onClick={onMobileClose} />
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="rounded-xl bg-[#FF6B01]/8 border border-[#FF6B01]/15 p-4">
                  <p className="text-white/40 text-xs leading-relaxed">
                    Powered by <span className="text-[#FF6B01] font-semibold">TMDB</span> — your cinematic companion.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideNAv;