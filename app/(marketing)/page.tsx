import Link from "next/link";
import { ArrowRight, Check, Zap, Shield, BarChart3, Users, Globe, Headphones } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Lightning Fast", desc: "Built on Next.js 14 with App Router for maximum performance." },
  { icon: Shield, title: "Secure by Default", desc: "Supabase auth, middleware protection, and row-level security out of the box." },
  { icon: BarChart3, title: "Analytics Ready", desc: "Track your users, revenue, and growth from day one." },
  { icon: Users, title: "Multi-tenant", desc: "Support multiple organizations and teams with ease." },
  { icon: Globe, title: "Custom Domains", desc: "Let your customers use their own domain names." },
  { icon: Headphones, title: "Support Built-in", desc: "Integrated support ticketing system for your customers." },
];

const PLANS = [
  {
    name: "Free",
    price: 0,
    desc: "Perfect for getting started",
    features: ["Up to 3 projects", "Basic analytics", "Community support", "1 team member"],
    cta: "Get Started Free",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 29,
    desc: "For growing businesses",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Up to 10 team members", "Custom domains", "API access"],
    cta: "Start Pro Trial",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    desc: "For large organizations",
    features: ["Everything in Pro", "Unlimited team members", "Dedicated support", "SLA guarantee", "Custom integrations", "White-label option"],
    cta: "Contact Sales",
    href: "/sign-up",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">SaaSly</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-white/60 hover:text-white transition-colors">Sign in</Link>
            <Link href="/sign-up" className="text-sm bg-[#6c63ff] hover:bg-[#5b52ee] px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6c63ff] opacity-10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#6c63ff]/10 border border-[#6c63ff]/30 rounded-full px-4 py-1.5 text-sm text-[#a78bfa] mb-8">
            <Zap className="w-3.5 h-3.5" />
            Production-ready SaaS boilerplate
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Ship your SaaS
            <span className="block gradient-text">10x faster</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop rebuilding auth, billing, and dashboards from scratch. SaaSly gives you a production-ready foundation so you can focus on what makes your product unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="inline-flex items-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ee] px-8 py-4 rounded-xl font-semibold text-lg transition-colors glow">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              See Features
            </a>
          </div>
          <p className="text-sm text-white/30 mt-6">No credit card required · Free plan available</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to launch</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">All the infrastructure and tooling built in, so you can focus on your product.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:border-[#6c63ff]/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#6c63ff]/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#6c63ff]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-white/50 text-lg">Start free, scale as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 flex flex-col ${plan.highlighted ? "bg-[#6c63ff] glow" : "glass"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#6c63ff] text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                  <p className={`text-sm mb-4 ${plan.highlighted ? "text-white/70" : "text-white/50"}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={plan.highlighted ? "text-white/70" : "text-white/50"}>/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-[#6c63ff]"}`} />
                      <span className={plan.highlighted ? "text-white/90" : "text-white/70"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`w-full py-3 rounded-xl font-semibold text-center transition-colors ${plan.highlighted ? "bg-white text-[#6c63ff] hover:bg-white/90" : "bg-[#6c63ff]/10 border border-[#6c63ff]/30 text-[#a78bfa] hover:bg-[#6c63ff]/20"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6c63ff]/10 to-transparent pointer-events-none" />
          <h2 className="text-4xl font-bold mb-4 relative">Ready to ship faster?</h2>
          <p className="text-white/50 text-lg mb-8 relative">Join hundreds of developers building with SaaSly.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ee] px-8 py-4 rounded-xl font-semibold text-lg transition-colors relative glow">
            Start Building Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-white/30 text-sm">
        <p>© 2026 SaaSly. Built by <a href="https://www.upwork.com/freelancers/~01ab365bf80abef051" className="text-[#6c63ff] hover:underline">Tommy Cursor</a>.</p>
      </footer>
    </div>
  );
}
