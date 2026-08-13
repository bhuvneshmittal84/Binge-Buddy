import React, { useRef } from "react";
import { Link } from "react-router-dom";
import NoImage from "../../../public/No_image.jpg";

const CardSkeleton = () => (
  <div className="min-w-[140px] sm:min-w-[160px] lg:min-w-[175px] rounded-2xl overflow-hidden bg-[#353535]/40 animate-pulse shrink-0">
    <div className="w-full h-[200px] sm:h-[230px] lg:h-[260px] bg-white/5" />
    <div className="p-3 space-y-2">
      <div className="h-2.5 bg-white/8 rounded w-3/4" />
      <div className="h-2.5 bg-white/8 rounded w-1/2" />
    </div>
  </div>
);

const HorizontalCards = ({ data }) => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse drag to scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.userSelect = "";
  };

  // Scroll buttons
  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  if (!data)
    return (
      <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 pb-6 overflow-hidden">
        {Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );

  return (
    <div className="relative group/row">

      {/* Left fade + arrow */}
      <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1c1c1c]/90 border border-white/10 text-white/70 hover:text-white hover:border-[#FF6B01]/50 hover:bg-[#FF6B01]/20 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 mb-3"
        style={{ marginBottom: "12px" }}
      >
        <i className="ri-arrow-left-s-line text-lg" />
      </button>

      {/* Right fade + arrow */}
      <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1c1c1c]/90 border border-white/10 text-white/70 hover:text-white hover:border-[#FF6B01]/50 hover:bg-[#FF6B01]/20 flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 mb-3"
        style={{ marginBottom: "12px" }}
      >
        <i className="ri-arrow-right-s-line text-lg" />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-3 sm:gap-4 px-4 sm:px-6 pb-3 overflow-x-auto overflow-y-visible hcards-scroll"
        style={{ cursor: "grab", scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        {data.map((d, i) => {
          const title     = d.name || d.title || d.original_name || d.original_title;
          const imagePath = d.poster_path || d.profile_path || d.backdrop_path;
          const mediaType = d.media_type;
          const year      = (d.release_date || d.first_air_date || "").slice(0, 4);

          return (
            <div key={i} className="shrink-0">
              <Link
                to={`/${mediaType}/details/${d.id}`}
                className="block group"
                draggable={false}
              >
                <div className="
                  relative
                  w-[140px] sm:w-[160px] lg:w-[175px]
                  rounded-2xl overflow-hidden
                  bg-[#1c1c1c]
                  border border-white/5
                  hover:border-[#FF6B01]/40
                  transition-all duration-300
                  hover:shadow-xl hover:shadow-[#FF6B01]/10
                  hover:-translate-y-1.5
                ">
                  {/* Poster */}
                  <div className="relative w-full h-[200px] sm:h-[230px] lg:h-[260px] overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={imagePath ? `https://image.tmdb.org/t/p/w342/${imagePath}` : NoImage}
                      alt={title}
                      draggable={false}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <p className="text-white/70 text-[11px] leading-relaxed line-clamp-3">
                        {d.overview?.slice(0, 90)}...
                      </p>
                      <div className="mt-2">
                        <span className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-[#FF6B01]/80 backdrop-blur-sm text-white text-xs font-bold">
                          <i className="ri-play-circle-fill text-sm" />
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    {d.vote_average > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10">
                        <i className="ri-star-fill text-[#FF6B01] text-[10px]" />
                        <span className="text-white text-[11px] font-semibold">{d.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Media type badge */}
                    {mediaType && (
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FF6B01] text-white">
                          {mediaType === "tv" ? "TV" : mediaType === "people" ? "Person" : "Film"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-3">
                    <h3 className="text-white text-sm font-semibold leading-tight truncate group-hover:text-[#FF6B01] transition-colors">
                      {title}
                    </h3>
                    <p className="text-white/30 text-xs mt-0.5">{year || "N/A"}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCards;