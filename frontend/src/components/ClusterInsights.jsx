import { useEffect, useState } from "react";
import { Boxes, Sparkles } from "lucide-react";
import { fetchClusters } from "../services/api";

export default function ClusterInsights() {
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        const loadClusters = async () => {
            try {
                const data = await fetchClusters();
                setClusters(data || []);
            } catch (err) {
                console.error(err);
                setClusters([]);
            }
        };

        loadClusters();
        const interval = setInterval(loadClusters, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card rounded-2xl p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Boxes size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white font-outfit">
                        Topic Clusters Summary
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Categorical issue distribution overview
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {clusters.length === 0 ? (
                    <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-xs font-mono text-center">
                        No topic clusters active yet.
                    </div>
                ) : (
                    clusters.map((cluster, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                            <div>
                                <h4 className="text-sm font-bold text-white font-outfit">
                                    {cluster.cluster_id || cluster.cluster || `Topic #${index + 1}`}
                                </h4>
                                {cluster.sample_ticket && (
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-sans">
                                        {cluster.sample_ticket}
                                    </p>
                                )}
                            </div>

                            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start md:self-center shrink-0">
                                {cluster.ticket_count || 0} Tickets
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}