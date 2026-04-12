import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSly — The SaaS Starter Kit",
  description: "Build your SaaS product faster with our production-ready boilerplate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
