import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { asyncloadpeople, removepeople } from "../store/actions/peopleActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/partials/Loader";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import NoImage from "../../public/No_image.jpg";
import { motion } from "framer-motion";

const PeopleDetails = () => {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => { dispatch(removepeople()); };
  }, [id]);

  if (!info) return <Loader />;

  const infoItems = [
    { label: "Known For",     value: info.detail.known_for_department },
    { label: "Gender",        value: info.detail.gender === 2 ? "Male" : "Female" },
    { label: "Birthday",      value: info.detail.birthday },
    ...(info.detail.deathday ? [{ label: "Died", value: info.detail.deathday }] : []),
    { label: "Born In",       value: info.detail.place_of_birth },
  ];

  const socialLinks = [
    { href: `https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`,   icon: "ri-earth-fill",           label: "Wikidata"  },
    { href: `https://www.instagram.com/${info.externalid.instagram_id}`,      icon: "ri-instagram-fill",       label: "Instagram" },
    { href: `https://www.facebook.com/${info.externalid.facebook_id}`,        icon: "ri-facebook-circle-fill", label: "Facebook"  },
    { href: `https://twitter.com/${info.externalid.twitter_id}`,              icon: "ri-twitter-x-fill",       label: "Twitter"   },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white pb-20 lg:pb-10 overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 flex items-center gap-4 px-4 sm:px-8 py-4 bg-[#111111]/95 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all"
        >
          <i className="ri-arrow-left-s-line text-lg" />
        </button>
        <span className="text-white/40 text-sm">People</span>
        <i className="ri-arrow-right-s-line text-white/20" />
        <span className="text-white text-sm font-medium truncate">{info.detail.name}</span>
      </nav>

      <div className="px-4 sm:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* ── Left: Photo + Personal Info ── */}
          <div className="lg:w-64 xl:w-72 shrink-0">
            {/* Photo */}
            <div className="w-48 sm:w-56 lg:w-full mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
              <img
                className="w-full aspect-[2/3] object-cover"
                src={
                  info.detail.poster_path || info.detail.profile_path || info.detail.backdrop_path
                    ? `https://image.tmdb.org/t/p/w342/${info.detail.poster_path || info.detail.profile_path || info.detail.backdrop_path}`
                    : NoImage
                }
                alt={info.detail.name}
              />
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-5 justify-center lg:justify-start">
              {socialLinks.map((s, i) =>
                s.href.replace(/https?:\/\/[^/]+\//, "") ? (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                    className="w-10 h-10 rounded-xl bg-[#353535]/60 border border-white/5 hover:bg-[#FF6B01]/20 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/50 hover:text-[#FF6B01] transition-all">
                    <i className={`${s.icon} text-lg`} />
                  </a>
                ) : null
              )}
            </div>

            {/* Personal Info */}
            <div className="mt-6 bg-[#1c1c1c] border border-white/5 rounded-2xl p-5 space-y-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider text-[#FF6B01]">Personal Info</h3>
              {infoItems.map((item, i) =>
                item.value ? (
                  <div key={i}>
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-white/80 text-sm">{item.value}</p>
                  </div>
                ) : null
              )}
              {info.detail.also_known_as?.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">Also Known As</p>
                  <p className="text-white/80 text-xs leading-relaxed">{info.detail.also_known_as.slice(0, 4).join(" · ")}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Bio + Credits ── */}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">{info.detail.name}</h1>

            {/* Biography */}
            <div className="mt-6">
              <SectionDivider title="Biography" />
              <p className="text-white/60 text-sm leading-relaxed">{info.detail.biography || "No biography available."}</p>
            </div>

            {/* Casted In */}
            <div className="mt-8">
              <SectionDivider title="Casted In" />
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>

            {/* Acting credits list */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <SectionDivider title="Acting" />
                <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
              </div>

              <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl overflow-hidden max-h-[50vh] overflow-y-auto scrollbar-hide">
                {info[category + "Credits"].cast.map((c, i) => {
                  const name = c.name || c.title || c.original_name || c.original_title;
                  const imgPath = c.backdrop_path || c.profile_path || c.poster_path;
                  return (
                    <Link key={i} to={`/${category}/details/${c.id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group">
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#353535] shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={imgPath ? `https://image.tmdb.org/t/p/w92/${imgPath}` : NoImage}
                          alt={name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate group-hover:text-[#FF6B01] transition-colors">{name}</p>
                        {c.character && (
                          <p className="text-white/40 text-xs mt-0.5 truncate">as {c.character}</p>
                        )}
                      </div>
                      {(c.release_date || c.first_air_date) && (
                        <span className="text-white/30 text-xs shrink-0">
                          {(c.release_date || c.first_air_date).slice(0, 4)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function SectionDivider({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-5 rounded-full bg-[#FF6B01]" />
      <h2 className="text-white text-lg font-bold">{title}</h2>
    </div>
  );
}

export default PeopleDetails;
