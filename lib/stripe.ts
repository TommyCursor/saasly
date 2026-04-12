import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLANS = [
  {
    name: "Free",
    slug: "free",
    price: { monthly: 0 },
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1 team member",
    ],
    priceId: null,
  },
  {
    name: "Pro",
    slug: "pro",
    price: { monthly: 29 },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Up to 10 team members",
      "Custom domains",
      "API access",
    ],
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: { monthly: 99 },
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "White-label option",
    ],
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  },
];
