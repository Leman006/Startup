import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Droplet,
  TrendingUp,
  Settings,
  Mail,
  Search,
  Bell,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const activePage = location.pathname;

  const navigationItems = [
    { id: "/", label: "Irrigation", icon: <Droplet size={18} /> },
    { id: "/water-usage", label: "Analytics", icon: <TrendingUp size={18} /> },
    { id: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center p-0 md:p-8 bg-[#0f140e] antialiased overflow-hidden relative">
      {/* Мягкие световые пятна на фоне для глубины */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full" />

      <div className="flex w-full max-w-[1600px] h-full md:h-[92vh] glass-panel rounded-none md:rounded-[40px] shadow-2xl overflow-hidden border border-white/10 relative z-10">
        {/* SIDEBAR: Ultra-Minimal */}
        <aside className="w-24 lg:w-64 bg-white/5 backdrop-blur-3xl flex flex-col border-r border-white/5 transition-all">
          <div className="p-8 mb-4">
            <div className="relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150"
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl"
                alt="Profile"
              />
              <div className="hidden lg:block mt-4">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Lucas Murray
                </h3>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
                  Chief Operator
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className={`flex items-center justify-center lg:justify-start gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group ${
                  activePage === item.id
                    ? "bg-white/10 text-white"
                    : "text-white/30 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={
                    activePage === item.id
                      ? "text-emerald-400"
                      : "group-hover:text-white"
                  }
                >
                  {item.icon}
                </span>
                <span className="hidden lg:block font-medium text-sm tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-white/5 to-transparent">
          <header className="h-24 px-10 flex justify-between items-center shrink-0 border-b border-white/5">
            <h2 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.5em]">
              System Monitoring / <span className="text-white/80">Active</span>
            </h2>
            <div className="flex items-center gap-4">
              <HeaderIcon icon={<Search size={16} />} />
              <HeaderIcon icon={<Bell size={16} />} />
              <div className="h-8 w-[1px] bg-white/10 mx-2" />
              <button className="hidden md:block px-6 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-white/5">
                Quick Action
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const HeaderIcon = ({ icon }) => (
  <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-90">
    {icon}
  </button>
);

export default DashboardLayout;
