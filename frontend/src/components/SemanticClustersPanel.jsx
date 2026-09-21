import { useEffect, useState } from "react";
import { Brain, Boxes, Layers, RefreshCw } from "lucide-react";
import { fetchSemanticClusters } from "../services/api";

export default function SemanticClustersPanel() {
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadClusters = async () => {
        try {
            setLoading(true);
            const data = await fetchSemanticClusters();
            setClusters(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClusters();
        const interval = setInterval(loadClusters, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card rounded-2xl p-6 border-cyan-500/20 glow-cyan mt-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Brain className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white font-outfit">
                            Unsupervised Semantic Ticket Clusters
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Cosine similarity vector grouping of emerging support topics
                        </p>
                    </div>
                </div>

                <button
                    onClick={loadClusters}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all text-xs flex items-center gap-1.5 font-mono"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
            </div>

            {loading && clusters.length === 0 ? (
                <div className="h-48 rounded-xl bg-slate-950/60 border border-slate-800 animate-pulse flex items-center justify-center text-slate-500 text-xs font-mono">
                    Computing vector cluster centroids...
                </div>
            ) : clusters.length === 0 ? (
                <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-slate-500 text-xs font-mono">
                    No semantic clusters generated yet. Analyze tickets in the workspace to form vector clusters.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clusters.map((cluster) => (
                        <div
                            key={cluster.cluster_id}
                            className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                                    <Boxes size={16} /> Cluster #{cluster.cluster_id}
                                </span>
                                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">
                                    {cluster.ticket_count} {cluster.ticket_count === 1 ? "Ticket" : "Tickets"}
                                </span>
                            </div>

                            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300 font-sans">
                                <p className="text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Centroid Sample</p>
                                <p className="line-clamp-3 leading-relaxed">{cluster.sample_ticket}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}