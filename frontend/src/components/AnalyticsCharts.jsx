import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { fetchAnalytics } from "../services/api";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

const COLORS = ["#10B981", "#06B6D4", "#EF4444", "#F59E0B", "#8B5CF6"];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-sans">
                <p className="font-bold text-white mb-1">{label || payload[0].name}</p>
                <p className="text-cyan-400 font-mono font-semibold">
                    Count: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function AnalyticsCharts() {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const data = await fetchAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadAnalytics();
        const interval = setInterval(loadAnalytics, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!analytics) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="h-80 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
                <div className="h-80 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
            </div>
        );
    }

    const categoryData = analytics?.category_distribution || [];
    const sentimentData = analytics?.sentiment_distribution || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Category Distribution Bar Chart */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <BarChart3 size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-outfit">Ticket Categories</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Real-time Volume</span>
                </div>

                {categoryData.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono">
                        No ticket category data recorded yet
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                            <XAxis dataKey="category" stroke="#64748B" fontSize={11} tickLine={false} />
                            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Sentiment Distribution Pie Chart */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                            <PieIcon size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-outfit">Sentiment Breakdown</h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Customer Emotion</span>
                </div>

                {sentimentData.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono">
                        No sentiment distribution data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={sentimentData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={95}
                                paddingAngle={5}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {sentimentData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#0F172A" strokeWidth={2} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}