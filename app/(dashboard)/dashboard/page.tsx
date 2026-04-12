import { createClient } from "@/lib/supabase/server";
import Header from "@/components/dashboard/Header";
import { BarChart3, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const STATS = [
  { label: "Total Revenue", value: "$12,450", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Active Users", value: "1,234", change: "+8.2%", up: true, icon: Users },
  { label: "Growth Rate", value: "24.5%", change: "+4.1%", up: true, icon: TrendingUp },
  { label: "Churn Rate", value: "2.4%", change: "-0.8%", up: false, icon: BarChart3 },
];

const RECENT = [
  { user: "Alice Johnson", plan: "Pro", amount: "$29", date: "Mar 30, 2026", status: "Active" },
  { user: "Bob Smith", plan: "Enterprise", amount: "$99", date: "Mar 29, 2026", status: "Active" },
  { user: "Carol White", plan: "Pro", amount: "$29", date: "Mar 28, 2026", status: "Active" },
  { user: "David Lee", plan: "Free", amount: "$0", date: "Mar 27, 2026", status: "Trial" },
  { user: "Emma Davis", plan: "Pro", amount: "$29", date: "Mar 26, 2026", status: "Active" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.email?.split("@")[0] ?? "there";

  return (
    <>
      <Header title="Dashboard" userEmail={user?.email} />
      <div className="flex-1 p-8 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {displayName} 👋</h2>
          <p className="text-white/50 mt-1">Here&apos;s what&apos;s happening with your product today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/50 text-sm">{stat.label}</span>
                <div className="w-9 h-9 rounded-lg bg-[#6c63ff]/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#6c63ff]" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`flex items-center gap-1 text-sm font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Subscribers */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold">Recent Subscribers</h3>
            <span className="text-sm text-white/40">Last 7 days</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">Plan</th>
                <th className="text-left px-6 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{row.user}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{row.plan}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{row.amount}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${row.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
