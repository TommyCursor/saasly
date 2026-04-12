import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Payment cancelled</h1>
        <p className="text-white/50 mb-8">
          No worries — you can upgrade anytime from your billing page.
        </p>
        <Link
          href="/billing"
          className="inline-flex items-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ee] px-8 py-3 rounded-xl font-semibold text-white transition-colors"
        >
          Back to Billing
        </Link>
      </div>
    </div>
  );
}
