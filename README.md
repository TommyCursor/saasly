# SaaSly — Production-Ready SaaS Boilerplate

A full-stack SaaS starter kit with everything you need to launch a subscription business. Built with Next.js 14, Supabase, Stripe, and Tailwind CSS.

## Live Demo
[saas-boilerplate-8phx5be30-tommys-projects-1345fc8e.vercel.app](https://saas-boilerplate-8phx5be30-tommys-projects-1345fc8e.vercel.app)

## Features
- Authentication — Supabase email/password auth with OTP verification
- Subscription billing — Stripe checkout with Pro and Enterprise plans
- Protected dashboard — KPI stats, recent subscribers, analytics overview
- Billing management — plan comparison, upgrade flows
- Settings — profile editing, notification preferences, security
- Middleware — route protection, auth session handling
- Multi-tenant ready — user roles and plan-based access control

## Tech Stack
- **Frontend:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion
- **Auth:** Supabase Auth
- **Database:** PostgreSQL via Supabase + Prisma ORM
- **Billing:** Stripe Checkout + Webhooks
- **Deployment:** Vercel

## Getting Started
```bash
npm install
cp .env.example .env.local
# Add your Supabase, Stripe keys
npm run dev
```

---
Built by [Adeyemi Adeyinka](https://github.com/TommyCursor) · [Hire me on Upwork](https://www.upwork.com/freelancers/~01ab365bf80abef051)
