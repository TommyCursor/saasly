"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap, ArrowRight, Eye, EyeOff, Star, TrendingUp, Shield, Sparkles } from "lucide-react";

const SLIDES = [
  {
    icon: TrendingUp,
    accent: "#6c63ff",
    title: "Launch in Days,\nNot Months",
    body: "Everything you need to ship a production SaaS is already wired up — auth, billing, database, and UI.",
    quote: "We went from idea to paying customers in under two weeks.",
    author: "Sarah K.",
    role: "Founder, FlowDesk",
    stars: 5,
  },
  {
    icon: Shield,
    accent: "#a78bfa",
    title: "Enterprise-Grade\nSecurity Built In",
    body: "Supabase Row-Level Security, encrypted secrets, and secure cookie-based sessions out of the box.",
    quote: "Our security audit passed first try. That's never happened before.",
    author: "Marcus T.",
    role: "CTO, Gridline AI",
    stars: 5,
  },
  {
    icon: Sparkles,
    accent: "#818cf8",
    title: "Beautiful UI,\nZero Design Work",
    body: "Dark-mode first, fully responsive components with smooth animations. Looks stunning from day one.",
    quote: "Users thought we hired a top-tier design agency. We didn't.",
    author: "Priya M.",
    role: "CEO, NovaDash",
    stars: 5,
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  const current = SLIDES[slide];
  const Icon = current.icon;

  return (
    <div className="min-h-screen flex bg-[#0a0a0f] text-white">
      {/* ── Left Carousel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12">
        {/* Background glow */}
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${current.accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-[#6c63ff]/30">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">SaaSly</span>
        </div>

        {/* Slide content */}
        <div className="relative flex-1 flex flex-col justify-center max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Icon badge */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${current.accent}22`, border: `1px solid ${current.accent}44` }}
              >
                <Icon className="w-6 h-6" style={{ color: current.accent }} />
              </motion.div>

              {/* Heading */}
              <h2 className="text-4xl font-bold leading-tight whitespace-pre-line">
                {current.title}
              </h2>

              {/* Body */}
              <p className="text-white/50 text-lg leading-relaxed">{current.body}</p>

              {/* Testimonial card */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-3 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: current.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/70 italic leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold">{current.author}</p>
                  <p className="text-xs text-white/40">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="relative flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === slide ? 28 : 8,
                background: i === slide ? current.accent : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Right Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Subtle top-right glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6c63ff]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] space-y-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">SaaSly</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-white/50 mt-2">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-white/60">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/60 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/60 focus:bg-white/[0.07] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6c63ff] to-[#818cf8] hover:from-[#5b52ee] hover:to-[#7279f0] disabled:opacity-60 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#6c63ff]/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
