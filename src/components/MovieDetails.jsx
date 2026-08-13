import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { asyncloadMovie, removemovie } from "../store/actions/movieActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";
import NoImage from "../../public/No_image.jpg";
import { motion } from "framer-motion";

function Moviedetails() {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadMovie(id));
    return () => { dispatch(removemovie()); };
  }, [id]);

  if (!info) return <Loader />;

  const title = info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title;
  const year = info.detail.release_date?.split("-")[0];
  const score = (info.detail.vote_average * 10).toFixed();

  return (
    <div
      className="relative min-h-screen w-full text-white overflow-x-hidden pb-20 lg:pb-10"
      style={{
        background: `linear-gradient(rgba(17,17,17,0.55), rgba(17,17,17,0.85), #111111),
                     url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path})`,
        backgroundPosition: "center top 10%",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Nav bar ── */}
      <nav className="sticky top-0 z-40 flex items-center gap-4 sm:gap-6 px-4 sm:px-8 py-4 bg-[#111111]/80 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all shrink-0"
        >
          <i className="ri-arrow-left-s-line text-lg" />
        </button>
        <div className="flex items-center gap-4 sm:gap-6 text-white/60">
          {info.detail.homepage && (
            <a href={info.detail.homepage} target="_blank" rel="noreferrer"
              className="hover:text-[#FF6B01] transition-colors" title="Homepage">
              <i className="ri-external-link-fill text-xl" />
            </a>
          )}
          <a href="https://www.wikidata.org/wiki/" target="_blank" rel="noreferrer"
            className="hover:text-[#FF6B01] transition-colors" title="Wikipedia">
            <i className="ri-earth-fill text-xl" />
          </a>
          <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} target="_blank" rel="noreferrer"
            className="hover:text-[#FF6B01] transition-colors border border-white/20 hover:border-[#FF6B01]/50 px-2.5 py-0.5 rounded-lg text-sm font-bold" title="IMDb">
            IMDb
          </a>
        </div>
      </nav>

      <div className="px-4 sm:px-8 pt-8">
        {/* ── Part 2: Poster + Details ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-10"
        >
          {/* Poster */}
          <div className="shrink-0 mx-auto sm:mx-0">
            <img
              className="w-40 sm:w-48 lg:w-56 rounded-2xl object-cover shadow-2xl shadow-black/70 border border-white/10"
              src={`https://image.tmdb.org/t/p/w342/${info.detail.poster_path || info.detail.profile_path || info.detail.backdrop_path}`}
              alt={title}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              {title}
              {year && <small className="text-white/40 font-semibold text-xl sm:text-2xl ml-3">({year})</small>}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-[#FF6B01] shadow-lg shadow-[#FF6B01]/40 flex  items-center justify-center shrink-0">
                <span className="text-white text-xs font-black leading-none">{score}</span>
                <sup className="text-white text-[9px] leading-none">%</sup>
              </div>
              <span className="text-white/60 text-sm font-medium">User Score</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60 text-sm">{info.detail.release_date}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60 text-sm">{info.detail.genres.map((g) => g.name).join(", ")}</span>
              {info.detail.runtime > 0 && (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/60 text-sm">{info.detail.runtime} min</span>
                </>
              )}
            </div>

            {/* Tagline */}
            {info.detail.tagline && (
              <p className="text-[#FF6B01]/80 italic text-sm sm:text-base font-medium mt-4">
                "{info.detail.tagline}"
              </p>
            )}

            {/* Overview */}
            <div className="mt-4">
              <h2 className="text-white font-bold text-base mb-2">Overview</h2>
              <p className="text-white/60 text-sm leading-relaxed">{info.detail.overview}</p>
            </div>

            {/* Translations */}
            <div className="mt-4">
              <h2 className="text-white font-bold text-base mb-2">Translations</h2>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{info.translations.join(" · ")}</p>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                to={`/movie/details/${id}/trailer`}
                className="inline-flex items-center gap-2 bg-[#FF6B01] hover:bg-[#e55f00] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#FF6B01]/30"
              >
                <i className="ri-play-fill text-base" />
                Watch Trailer
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Part 3: Watch Providers ── */}
        {(info.watchproviders?.flatrate || info.watchproviders?.rent) && (
          <div className="mt-10 flex flex-col gap-4">
            {[
              { key: "flatrate", label: "Stream On" },
              { key: "rent",     label: "Rent On" },
              { key: "buy",      label: "Buy On" },
            ].map(({ key, label }) =>
              info.watchproviders?.[key] ? (
                <div key={key} className="flex items-center gap-4 flex-wrap">
                  <span className="text-white/50 text-xs font-semibold uppercase tracking-wider w-16 shrink-0">{label}</span>
                  <div className="flex gap-2 flex-wrap">
                    {info.watchproviders[key].map((w, i) => (
                      <img key={i} title={w.provider_name}
                        className="w-9 h-9 rounded-xl object-cover border border-white/10"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt={w.provider_name} />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {/* ── Part 4: Recommendations ── */}
        <SectionDivider title="Recommendations" />
        <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />

        {/* ── Part 5: Cast ── */}
        <SectionDivider title="Cast" />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {info.credits.map((s, i) => (
            <Link key={i} to={`/people/details/${s.id}`}
              className="group shrink-0 w-24 sm:w-28 flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1c1c1c] border border-white/5 group-hover:border-[#FF6B01]/40 transition-colors">
                <img
                  className="w-full h-full object-cover"
                  src={s.profile_path ? `https://image.tmdb.org/t/p/w185/${s.profile_path}` : NoImage}
                  alt={s.name}
                />
              </div>
              <p className="text-white text-xs font-semibold leading-tight text-center line-clamp-2 group-hover:text-[#FF6B01] transition-colors">
                {s.name || s.title || s.original_name || s.original_title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}

function SectionDivider({ title }) {
  return (
    <div className="flex items-center gap-3 mt-10 mb-5">
      <div className="w-1 h-6 rounded-full bg-[#FF6B01]" />
      <h2 className="text-white text-xl font-bold">{title}</h2>
    </div>
  );
}

export default Moviedetails;
