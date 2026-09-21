import {
    Bell,
    ShieldCheck,
    Search,
    User,
    LogOut,
    Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { logoutUser } from "../services/api";

export default function Header() {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logoutUser();
        window.location.href = "/login";
    };

    return (
        <header className="w-full bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800/80 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-outfit">
                    AI Support Command Center
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live System
                    </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Autonomous Multi-Agent Ticket Classification & Decision Intelligence Engine
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search
                        className="absolute left-3.5 top-2.5 text-slate-500"
                        size={16}
                    />
                    <input
                        type="text"
                        placeholder="Search tickets, customers, rules..."
                        className="bg-slate-900/90 text-slate-200 placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2 text-xs outline-none w-64 border border-slate-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    />
                </div>

                {/* System Status Pill */}
                <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                    <ShieldCheck className="text-emerald-400" size={18} />
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Backend Engine</p>
                        <p className="text-xs text-emerald-400 font-semibold">100% Operational</p>
                    </div>
                </div>

                {/* Clock */}
                <div className="hidden sm:block text-right px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Local Time</p>
                    <p className="text-slate-200 font-semibold">{currentTime}</p>
                </div>

                {/* Notification Bell */}
                <button className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all relative">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
                </button>

                {/* User Profile Pill */}
                {(() => {
                    const currentUser = localStorage.getItem("username") || "admin";
                    const initial = currentUser.charAt(0).toUpperCase();
                    return (
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20 uppercase font-outfit">
                                {initial}
                            </div>
                            <div className="hidden xl:block text-left">
                                <p className="text-xs font-semibold text-slate-200 capitalize font-outfit">{currentUser}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{currentUser.toLowerCase()}@support.ai</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Logout"
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all ml-1"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    );
                })()}
            </div>
        </header>
    );
}