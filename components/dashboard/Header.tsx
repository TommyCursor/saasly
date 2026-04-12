import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  userEmail?: string;
}

export default function Header({ title, userEmail }: HeaderProps) {
  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0a0a0f]">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center text-xs font-bold shadow">
          {initials}
        </div>
      </div>
    </header>
  );
}
