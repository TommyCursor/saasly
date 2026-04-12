import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Header from "@/components/dashboard/Header";
import { User, Bell, Shield, Trash2 } from "lucide-react";
import { updateProfile, sendPasswordReset } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email ?? "";
  const firstName = user?.user_metadata?.first_name ?? "";
  const lastName = user?.user_metadata?.last_name ?? "";

  const successMsg =
    searchParams.success === "profile-updated" ? "Profile saved successfully." :
    searchParams.success === "reset-sent" ? "Password reset email sent — check your inbox." :
    null;

  const errorMsg =
    searchParams.error === "reset-failed" ? "Failed to send reset email. Check your Supabase redirect URL settings." :
    searchParams.error === "profile-update-failed" ? "Failed to save profile." :
    searchParams.error === "no-user" ? "No user session found." :
    null;

  return (
    <>
      <Header title="Settings" userEmail={email} />
      <div className="flex-1 p-8 space-y-6 max-w-3xl">
        {successMsg && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 text-sm">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Profile */}
        <form action={updateProfile} className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <User className="w-4 h-4 text-[#6c63ff]" />
            <h3 className="font-semibold">Profile</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/50 block mb-2">First Name</label>
                <input
                  name="firstName"
                  defaultValue={firstName}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6c63ff]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 block mb-2">Last Name</label>
                <input
                  name="lastName"
                  defaultValue={lastName}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6c63ff]/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/50 block mb-2">Email</label>
              <input
                defaultValue={email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/40 cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="bg-[#6c63ff] hover:bg-[#5b52ee] px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Notifications */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <Bell className="w-4 h-4 text-[#6c63ff]" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Email notifications", desc: "Receive updates about your account via email" },
              { label: "Usage alerts", desc: "Get notified when you're approaching plan limits" },
              { label: "Product updates", desc: "Hear about new features and improvements" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                </div>
                <button type="button" className="w-11 h-6 bg-[#6c63ff] rounded-full relative transition-colors">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#6c63ff]" />
            <h3 className="font-semibold">Security</h3>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-white/40 mt-0.5">Send a password reset link to your email</p>
            </div>
            <form action={sendPasswordReset}>
              <button
                type="submit"
                className="border border-white/10 hover:border-white/20 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-3">
            <Trash2 className="w-4 h-4 text-red-400" />
            <h3 className="font-semibold text-red-400">Danger Zone</h3>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-white/40 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <button
              type="button"
              className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
