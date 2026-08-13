import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./partials/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLayout from "./partials/PageLayout";
import { motion } from "framer-motion";

const Trending = () => {
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      setTrending((prev) => [...prev, ...data.results]);

      if (data.page < data.total_pages) {
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = async () => {
    try {
      setLoading(true);
      setHasMore(true);

      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=1`
      );

      setTrending(data.results);
      setPage(2);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return loading ? (
    <Loading />
  ) : (
    <PageLayout
      title="Trending"
      icon="ri-fire-fill"
      filters={[
        {
          label: "Category",
          options: ["movie", "tv", "all"],
          func: (e) => setCategory(e.target.value),
        },
        {
          label: "Duration",
          options: ["week", "day"],
          func: (e) => setDuration(e.target.value),
        },
      ]}
    >
      {/* 🔥 Background Glow Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#FF6B01]/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      {/* ✨ Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
          🔥 Trending Now
        </h2>
        <p className="text-white/40 text-sm">
          Discover what everyone is watching right now
        </p>
      </motion.div>

      {/* 🎬 Infinite Scroll Grid */}
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        scrollThreshold="150px"
        loader={
          <div className="flex items-center justify-center gap-2 py-8 text-white/40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <i className="ri-loader-4-line text-[#FF6B01] text-2xl" />
            </motion.div>
            Loading more...
          </div>
        }
        endMessage={
          <p className="text-center text-white/30 py-6">
            🎬 You've explored all trending content
          </p>
        }
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </PageLayout>
  );
};

export default Trending;