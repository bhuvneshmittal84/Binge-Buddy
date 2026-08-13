import React, { useEffect, useState } from "react";
import SideNAv from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loader from "./partials/Loader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  document.title = "Home - BingeBuddy";
  const [wallpaper,   setwallpaper]   = useState(null);
  const [trending,    setTrending]    = useState(null);
  const [popular,     setPopular]     = useState(null);
  const [movies,      setMovies]      = useState(null);
  const [tvshows,     setTvshows]     = useState(null);
  const [people,      setPeople]      = useState(null);
  const [category,    setcategory]    = useState("all");
  const [drawerOpen,  setDrawerOpen]  = useState(false);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`trending/all/day?language=en-US`);
      const randomData = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) { console.log(error); }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day?language=en-US`);
      setTrending(data.results);
    } catch (error) { console.log(error); }
  };

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`movie/popular?page=1`);
      setPopular(data.results);
    } catch (error) { console.log(error); }
  };

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`movie/now_playing?page=1`);
      setMovies(data.results);
    } catch (error) { console.log(error); }
  };

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`tv/on_the_air?page=1`);
      setTvshows(data.results);
    } catch (error) { console.log(error); }
  };

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=1`);
      setPeople(data.results);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  useEffect(() => {
    getPopular();
    getMovies();
    getTvShows();
    getPeople();
  }, []);

  // Normalise people data so HorizontalCards link resolves correctly
  const normalisedPeople = people?.map((p) => ({ ...p, media_type: "people" }));

  const Section = ({ title, subtitle, emoji, data, linkTo }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      style={{ willChange: "transform, opacity" }}
      className="mt-8 sm:mt-10"
    >
      <div className="flex justify-between items-center px-4 sm:px-6 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-6 rounded-full bg-[#FF6B01]" />
          <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">
            {emoji} {title}
          </h2>
          {subtitle && (
            <span className="text-white/30 text-sm font-medium hidden sm:block">{subtitle}</span>
          )}
        </div>
        <Link
          to={linkTo}
          className="text-xs text-[#FF6B01] hover:text-white border border-[#FF6B01]/30 hover:border-[#FF6B01] px-3 py-1.5 rounded-lg transition-all"
        >
          View All →
        </Link>
      </div>
      <HorizontalCards data={data} />
    </motion.div>
  );

  return wallpaper ? (
    <div className="flex w-screen h-screen bg-[#111111]">
      <SideNAv mobileOpen={drawerOpen} onMobileClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Sticky TopNav */}
        <div className="sticky top-0 z-50 shrink-0 bg-[#141414]/95 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 overflow-visible">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden shrink-0 w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all"
            >
              <i className="ri-menu-line text-lg" />
            </button>
            <div className="flex-1 min-w-0">
              <TopNav hideLogo />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-scroll scrollbar-hide pb-4" style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}>

          {/* Hero */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ willChange: "opacity" }}>
            <Header data={wallpaper} />
          </motion.div>

          {/* Trending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            style={{ willChange: "transform, opacity" }}
            className="mt-6 sm:mt-8"
          >
            <div className="flex justify-between items-center px-4 sm:px-6 mb-4 sm:mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-6 rounded-full bg-[#FF6B01]" />
                <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">🔥 Trending</h2>
                <span className="text-white/30 text-sm font-medium hidden sm:block">Today</span>
              </div>
              <div className="flex items-center gap-3">
                <Dropdown
                  title="Filter"
                  options={["tv", "movie", "all"]}
                  func={(e) => setcategory(e.target.value)}
                />
                <Link
                  to="/trending"
                  className="text-xs text-[#FF6B01] hover:text-white border border-[#FF6B01]/30 hover:border-[#FF6B01] px-3 py-1.5 rounded-lg transition-all"
                >
                  View All →
                </Link>
              </div>
            </div>
            <HorizontalCards data={trending} />
          </motion.div>

          {/* Popular */}
          <Section title="Popular" subtitle="Right Now" emoji="⭐" data={popular}  linkTo="/popular" />

          {/* Movies */}
          <Section title="Movies"  subtitle="Now Playing" emoji="🎬" data={movies}   linkTo="/movie" />

          {/* TV Shows */}
          <Section title="TV Shows" subtitle="On The Air"  emoji="📺" data={tvshows}  linkTo="/tv" />

          {/* People */}
          <Section title="People"  subtitle="Popular"     emoji="👥" data={normalisedPeople} linkTo="/people" />

          <div className="h-8" />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Home;