import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">You're all set!</h1>
        <p className="text-white/50 mb-8">
          Your subscription is now active. Welcome to the next level.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ee] px-8 py-3 rounded-xl font-semibold text-white transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
