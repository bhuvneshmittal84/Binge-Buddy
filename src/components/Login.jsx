import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Login() {
  document.title = "Login – BingeBuddy";
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (err) setError(err);
    else navigate("/");
  };

  return (
    <div className="min-h-screen w-screen bg-[#111111] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B01]/8 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#FF6B01]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-[#1a1a1a] border border-white/8 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B01] flex items-center justify-center shadow-lg shadow-[#FF6B01]/30">
              <i className="ri-tv-2-line text-white text-lg" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Binge<span className="text-[#FF6B01]">Buddy</span>
            </span>
          </div>

          <h1 className="text-white text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm mb-7">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider">Email</label>
              <div className="flex items-center gap-2.5 bg-[#252525] border border-white/8 rounded-xl px-4 py-3 focus-within:border-[#FF6B01]/60 focus-within:shadow-[0_0_0_1px_rgba(255,107,1,0.25)] transition-all">
                <i className="ri-mail-line text-white/30 text-base" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider">Password</label>
              <div className="flex items-center gap-2.5 bg-[#252525] border border-white/8 rounded-xl px-4 py-3 focus-within:border-[#FF6B01]/60 focus-within:shadow-[0_0_0_1px_rgba(255,107,1,0.25)] transition-all">
                <i className="ri-lock-line text-white/30 text-base" />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none"
                  autoComplete="current-password"
                  required
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="text-white/30 hover:text-white/70 transition-colors">
                  <i className={`${showPass ? "ri-eye-off-line" : "ri-eye-line"} text-base`} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                <i className="ri-error-warning-line" /> {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              id="login-submit"
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-[#FF6B01] hover:bg-[#e55f00] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#FF6B01]/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading
                ? <><i className="ri-loader-4-line animate-spin" /> Signing in...</>
                : <><i className="ri-login-box-line" /> Sign In</>
              }
            </motion.button>
          </form>

          <p className="text-white/30 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF6B01] hover:text-[#ff8533] font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
