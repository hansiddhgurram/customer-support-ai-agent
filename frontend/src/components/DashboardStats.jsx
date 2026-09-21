import {
    AlertTriangle,
    Activity,
    ShieldAlert,
    TrendingUp,
    Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";

export default function DashboardStats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const data = await fetchAnalytics();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadAnalytics();
        const interval = setInterval(loadAnalytics, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
                ))}
            </div>
        );
    }

    const cards = [
        {
            title: "Total Tickets Tracked",
            value: stats.total_tickets ?? 0,
            icon: Activity,
            badge: "+12.4%",
            badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
            iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 glow-cyan"
        },
        {
            title: "Critical Incidents",
            value: stats.critical_incidents ?? 0,
            icon: AlertTriangle,
            badge: stats.critical_incidents > 0 ? "Action Needed" : "All Clear",
            badgeColor: stats.critical_incidents > 0 ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20 glow-red"
        },
        {
            title: "High Churn Risk Accounts",
            value: stats.high_churn_risk ?? 0,
            icon: ShieldAlert,
            badge: "Retention Watch",
            badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
        },
        {
            title: "SLA Resolution Rate",
            value: `${stats.resolution_rate ?? 100}%`,
            icon: TrendingUp,
            badge: "99.8% Target",
            badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className="glass-card rounded-2xl p-6 relative overflow-hidden group"
                    >
                        {/* Background Glow Overlay */}
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500" />
                        
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                                {card.title}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${card.badgeColor}`}>
                                {card.badge}
                            </span>
                        </div>

                        <div className="flex items-baseline justify-between mt-4">
                            <h2 className="text-4xl font-extrabold text-white tracking-tight font-outfit">
                                {card.value}
                            </h2>
                            <div className={`p-3 rounded-xl border ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}