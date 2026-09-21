import { useEffect, useState } from "react";
import { AlertTriangle, Flame, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { fetchIncidents } from "../services/api";

export default function IncidentAlert() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadIncidents = async () => {
        try {
            const data = await fetchIncidents();
            setIncidents(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIncidents();
        const interval = setInterval(loadIncidents, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card rounded-2xl p-6 border-rose-500/20 glow-red mt-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                        <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white font-outfit">
                            Real-Time Critical Incident Feed
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Automated P1/Critical spike detection & churn vulnerability alerts
                        </p>
                    </div>
                </div>

                <button
                    onClick={loadIncidents}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all text-xs flex items-center gap-1.5 font-mono"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            <div className="space-y-3">
                {incidents.length === 0 ? (
                    <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-semibold text-slate-200 font-outfit">No Critical Incidents Active</p>
                        <p className="text-xs text-slate-500 mt-1">All support channels operating within normal SLA thresholds.</p>
                    </div>
                ) : (
                    incidents.map((incident, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white font-outfit">
                                        {incident.category} Incident Flagged
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-0.5 font-mono">
                                        Customer Sentiment: <span className="text-rose-400 font-semibold">{incident.sentiment}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                                    {incident.priority}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                    Churn: {incident.churn_risk}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}