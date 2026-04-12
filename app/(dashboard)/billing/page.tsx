import Header from "@/components/dashboard/Header";
import { Check, Zap } from "lucide-react";
import { createCheckout } from "./actions";

const PLANS = [
  {
    name: "Free",
    price: 0,
    desc: "For individuals getting started",
    features: ["Up to 3 projects", "Basic analytics", "Community support", "1 team member"],
    priceId: null,
    current: true,
    highlighted: false,
  },
  {
    name: "Pro",
    price: 29,
    desc: "For growing teams",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Up to 10 team members", "Custom domains", "API access"],
    priceId: "price_1TIuddHblckHwDGz3Vzg377Y",
    current: false,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    desc: "For large organizations",
    features: ["Everything in Pro", "Unlimited team members", "Dedicated support", "SLA guarantee", "Custom integrations", "White-label"],
    priceId: "price_1TIueRHblckHwDGzpgngSPDD",
    current: false,
    highlighted: false,
  },
];

export default function BillingPage() {
  return (
    <>
      <Header title="Billing" />
      <div className="flex-1 p-8 space-y-8">
        {/* Current Plan */}
        <div className="glass rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-sm mb-1">Current Plan</p>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Free Plan</h2>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium">Active</span>
            </div>
            <p className="text-white/40 text-sm mt-1">Upgrade to unlock more features.</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#6c63ff]/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#6c63ff]" />
          </div>
        </div>

        {/* Plans */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Choose a Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-6 flex flex-col ${plan.highlighted ? "bg-[#6c63ff] glow" : "glass"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#6c63ff] text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-1">{plan.name}</h4>
                  <p className={`text-sm mb-4 ${plan.highlighted ? "text-white/70" : "text-white/50"}`}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className={plan.highlighted ? "text-white/70" : "text-white/50"}>/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-[#6c63ff]"}`} />
                      <span className={plan.highlighted ? "text-white/90" : "text-white/70"}>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <div className="w-full py-2.5 rounded-xl font-medium text-center text-sm bg-white/5 text-white/40">
                    Current Plan
                  </div>
                ) : (
                  <form action={createCheckout.bind(null, plan.priceId!)}>
                    <button
                      type="submit"
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                        plan.highlighted
                          ? "bg-white text-[#6c63ff] hover:bg-white/90"
                          : "bg-[#6c63ff]/10 border border-[#6c63ff]/30 text-[#a78bfa] hover:bg-[#6c63ff]/20"
                      }`}
                    >
                      Upgrade to {plan.name}
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-xs text-center">
          Stripe test mode — use card <span className="font-mono">4242 4242 4242 4242</span> with any future date and CVC.
        </p>
      </div>
    </>
  );
}
