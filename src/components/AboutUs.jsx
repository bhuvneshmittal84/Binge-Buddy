import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import profilePic from "../../public/profile_picture.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-y-auto px-4 sm:px-8 lg:px-20 pt-14 pb-20 lg:pb-14 relative">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-4 sm:left-6 w-9 h-9 rounded-xl bg-[#353535]/60 hover:bg-[#FF6B01]/20 border border-white/5 hover:border-[#FF6B01]/40 flex items-center justify-center text-white/60 hover:text-[#FF6B01] transition-all"
        title="Go Back"
      >
        <ArrowLeft size={16} />
      </button>

      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full bg-[#FF6B01]" />
          <h1 className="text-4xl sm:text-5xl font-black text-white">About Us</h1>
        </div>
        <p className="text-white/40 text-sm ml-4">Learn more about BingeBuddy</p>
      </motion.div>

      {/* Intro */}
      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="text-base text-white/60 leading-8 max-w-3xl mb-14"
      >
        Welcome to{" "}
        <span className="text-[#FF6B01] font-semibold">BingeBuddy</span> — your
        cinematic companion built for curious streamers and hardcore film lovers.
        Our goal is simple: to make movie discovery fast, sleek, and enjoyable
        with cutting-edge tools and intuitive UI.
      </motion.p>

      {/* Vision + Mission */}
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {[
          {
            title: "Our Vision",
            icon: "ri-eye-fill",
            desc: "To redefine entertainment discovery with a futuristic, aesthetic, and efficient interface powered by modern web technology.",
          },
          {
            title: "Our Mission",
            icon: "ri-rocket-fill",
            desc: "To combine creativity with engineering — building a platform that feels as exciting as the stories it features.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index + 3}
            whileHover={{ y: -4 }}
            className="bg-[#1c1c1c] border border-white/5 hover:border-[#FF6B01]/30 backdrop-blur-md p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B01]/10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF6B01]/15 border border-[#FF6B01]/20 flex items-center justify-center mb-4">
              <i className={`${item.icon} text-[#FF6B01] text-lg`} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{item.title}</h2>
            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Meet the Creators */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-[#FF6B01]" />
          <h2 className="text-2xl font-bold text-white">Meet the Creator</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ name: "Bhunesh Mittal", role: "MERN Developer" }].map((person, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1c1c1c] border border-white/5 hover:border-[#FF6B01]/30 p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B01]/10"
            >
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden border-2 border-[#FF6B01]/30">
                <img className="w-full h-full object-cover" src={profilePic} alt={person.name} />
              </div>
              <h3 className="text-white font-bold text-base">{person.name}</h3>
              <p className="text-[#FF6B01] text-sm mt-1">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
