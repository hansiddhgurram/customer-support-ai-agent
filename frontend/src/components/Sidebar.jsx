import {
    LayoutDashboard,
    FileSearch,
    AlertTriangle,
    BookOpen,
    Boxes,
    Settings,
    Bot,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard
    },
    {
        name: "Ticket Analysis",
        path: "/analysis",
        icon: FileSearch
    },
    {
        name: "Incidents",
        path: "/incidents",
        icon: AlertTriangle
    },
    {
        name: "Knowledge Base",
        path: "/knowledge-base",
        icon: BookOpen
    },
    {
        name: "Clusters",
        path: "/clusters",
        icon: Boxes
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }
];

export default function Sidebar() {
    const { theme } = useTheme();

    return (
        <aside className="w-72 h-screen sticky top-0 flex flex-col bg-[#030712]/90 backdrop-blur-2xl border-r border-slate-800/80 z-40 selection:bg-cyan-500/30">
            {/* Brand Logo & Header */}
            <div className="p-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 glow-cyan">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight font-outfit gradient-text-cyan">
                            SupportAI <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">v2.4</span>
                        </h1>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" /> Multi-Agent Ops
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Workspace Navigation
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `group relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-transparent text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/40"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent hover:border-slate-800/60"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-sm shadow-cyan-400" />
                                    )}
                                    <Icon
                                        size={20}
                                        className={`transition-colors duration-300 ${
                                            isActive
                                                ? "text-cyan-400"
                                                : "text-slate-500 group-hover:text-cyan-400"
                                        }`}
                                    />
                                    <span className="font-medium tracking-wide">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer Agent Status */}
            <div className="p-4 border-t border-slate-800/80">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <div>
                            <p className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> System Active
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">Groq LLaMA 3.1 LLM</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}