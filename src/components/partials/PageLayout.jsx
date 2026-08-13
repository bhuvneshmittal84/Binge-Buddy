import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";

const PageLayout = ({ filters = [], children }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#111111] flex flex-col">

      {/* 🔝 Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/5 overflow-visible shrink-0">

        {/* Row 1 (mobile): Back button + Filter dropdowns */}
        {/* Row 1 (desktop): Back + Search + Filters all in one line */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 pb-2 sm:pb-3">

          {/* ⬅️ Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 shrink-0 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>

          {/* 🔍 Search — full width on mobile row 2, inline on desktop */}
          <div className="hidden sm:block flex-1 min-w-0 overflow-visible">
            <TopNav hideLogo />
          </div>

          {/* 🎛 Filters */}
          <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
            {filters.map((f, i) => (
              <Dropdown
                key={i}
                title={f.label}
                options={f.options}
                func={f.func}
              />
            ))}
          </div>
        </div>

        {/* Row 2 (mobile only): Search bar full width */}
        <div className="sm:hidden px-4 pb-3 overflow-visible">
          <TopNav hideLogo />
        </div>

      </div>

      {/* 🔥 SCROLL CONTAINER */}
      <div
        id="scrollableDiv"
        className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4"
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;