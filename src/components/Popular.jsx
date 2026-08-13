import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./partials/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLayout from "./partials/PageLayout";
import { motion } from "framer-motion";

const Popular = () => {
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `/${category}/popular?page=${page}`
      );

      setPopular((prev) => [...prev, ...data.results]);

      if (data.page < data.total_pages) {
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    try {
      setLoading(true);
      setHasMore(true);

      const { data } = await axios.get(
        `/${category}/popular?page=1`
      );

      setPopular(data.results);
      setPage(2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return loading ? (
    <Loading />
  ) : (
    <PageLayout
      filters={[
        {
          label: "Category",
          options: ["tv", "movie"],
          func: (e) => setCategory(e.target.value),
        },
      ]}
    >
      {/* ✨ Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
          🎬 Popular {category === "movie" ? "Movies" : "Shows"}
        </h2>
        <p className="text-white/40 text-sm">
          Discover what’s trending among audiences right now
        </p>
      </motion.div>

      {/* 🎬 Infinite Scroll */}
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        scrollThreshold="150px"
        loader={
          <div className="flex items-center justify-center gap-2 py-8 text-white/40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <i className="ri-loader-4-line text-[#FF6B01] text-xl" />
            </motion.div>
            Loading more...
          </div>
        }
        endMessage={
          <p className="text-center text-white/30 py-6">
            🎬 You’ve reached the end
          </p>
        }
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </PageLayout>
  );
};

export default Popular;