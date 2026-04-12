"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap, ArrowRight, Eye, EyeOff, Star, TrendingUp, Shield, Sparkles, Check, RotateCcw } from "lucide-react";

const SLIDES = [
  {
    icon: TrendingUp,
    accent: "#6c63ff",
    title: "Your SaaS,\nReady to Ship",
    body: "Stop building infrastructure. Start building your product. Everything is wired and waiting for you.",
    quote: "I saved at least 3 months of setup time. Worth every penny.",
    author: "James R.",
    role: "Solo Founder, Trackr",
    stars: 5,
  },
  {
    icon: Shield,
    accent: "#a78bfa",
    title: "Built for Scale\nFrom Day One",
    body: "Supabase, Prisma, and Stripe — a proven stack that grows with your business without re-architecting.",
    quote: "We scaled to 10k users without touching the core infrastructure.",
    author: "Lena W.",
    role: "Co-Founder, Pulsify",
    stars: 5,
  },
  {
    icon: Sparkles,
    accent: "#818cf8",
    title: "Focus on What\nMatters Most",
    body: "Your users, your revenue, your product. Not boilerplate. We handle the boring parts perfectly.",
    quote: "SaaSly let our tiny team compete with companies 10x our size.",
    author: "Kai O.",
    role: "Product Lead, Vaultly",
    stars: 5,
  },
];

const PERKS = [
  "Free forever — no credit card needed",
  "Full-stack boilerplate included",
  "Stripe billing pre-configured",
];

type Step = "form" | "verify";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [slide, setSlide] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Focus first code box when verify step appears
  useEffect(() => {
    if (step === "verify") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setStep("verify");
      setLoading(false);
    }
  }

  function handleCodeChange(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = char;
    setCode(next);
    if (char && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 8 filled
    if (char && index === 7) {
      const full = [...next].join("");
      if (full.length === 8) verifyCode(full);
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8);
    if (pasted.length === 8) {
      setCode(pasted.split(""));
      verifyCode(pasted);
    }
  }

  async function verifyCode(token?: string) {
    const finalToken = token ?? code.join("");
    if (finalToken.length < 8) return;
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: finalToken,
      type: "signup",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  async function resendCode() {
    setResending(true);
    setError("");
    const supabase = createClient();
    await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    setCode(["", "", "", "", "", "", "", ""]);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }

  const current = SLIDES[slide];
  const Icon = current.icon;

  return (
    <div className="min-h-screen flex bg-[#0a0a0f] text-white">
      {/* ── Left Carousel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12">
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
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-[#6c63ff]/30">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">SaaSly</span>
        </div>

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
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${current.accent}22`, border: `1px solid ${current.accent}44` }}
              >
                <Icon className="w-6 h-6" style={{ color: current.accent }} />
              </motion.div>

              <h2 className="text-4xl font-bold leading-tight whitespace-pre-line">{current.title}</h2>
              <p className="text-white/50 text-lg leading-relaxed">{current.body}</p>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 space-y-3 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: current.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/70 italic leading-relaxed">&ldquo;{current.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{current.author}</p>
                  <p className="text-xs text-white/40">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6c63ff]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 lg:hidden mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">SaaSly</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold">Create your account</h1>
                  <p className="text-white/50 mt-2">Start building your SaaS today</p>
                </div>

                <div className="space-y-2.5">
                  {PERKS.map((p) => (
                    <div key={p} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#6c63ff]/15 border border-[#6c63ff]/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#a78bfa]" />
                      </div>
                      <span className="text-sm text-white/60">{p}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
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
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
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
                        Creating account…
                      </span>
                    ) : (
                      <>
                        Create Free Account <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-white/25 leading-relaxed">
                    By creating an account you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>

                <p className="text-center text-sm text-white/40">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-[#6c63ff]/10 border border-[#6c63ff]/30 flex items-center justify-center"
                >
                  <svg className="w-7 h-7 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </motion.div>

                <div>
                  <h1 className="text-3xl font-bold">Check your email</h1>
                  <p className="text-white/50 mt-2 text-sm leading-relaxed">
                    We sent a 6-digit code to{" "}
                    <span className="text-white font-medium">{email}</span>.
                    Enter it below to verify your account.
                  </p>
                </div>

                {/* Code inputs */}
                <div className="space-y-4">
                  <div className="flex gap-3 justify-between" onPaste={handleCodePaste}>
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#6c63ff]/60 focus:bg-white/[0.07] transition-all"
                      />
                    ))}
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
                    onClick={() => verifyCode()}
                    disabled={loading || code.join("").length < 8}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6c63ff] to-[#818cf8] hover:from-[#5b52ee] hover:to-[#7279f0] disabled:opacity-40 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#6c63ff]/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Verifying…
                      </span>
                    ) : (
                      <>
                        Verify Account <Check className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => { setStep("form"); setError(""); setCode(["","","","","",""]); }}
                    className="text-white/40 hover:text-white/70 transition-colors"
                  >
                    ← Change email
                  </button>
                  <button
                    onClick={resendCode}
                    disabled={resending}
                    className="flex items-center gap-1.5 text-[#a78bfa] hover:text-[#c4b5fd] transition-colors disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                    {resending ? "Sending…" : "Resend code"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
