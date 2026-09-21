import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Folder, CheckCircle, Search, Layers } from "lucide-react";
import { fetchKnowledgeBase } from "../services/api";

export default function KnowledgeBasePanel() {
    const [entries, setEntries] = useState([]);
    const [filterCategory, setFilterCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const loadKnowledge = async () => {
        try {
            setLoading(true);
            const data = await fetchKnowledgeBase();
            setEntries(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadKnowledge();
        const interval = setInterval(loadKnowledge, 4000);
        return () => clearInterval(interval);
    }, []);

    const categories = ["all", ...new Set(entries.map((e) => e.category).filter(Boolean))];

    const filteredEntries = entries.filter((e) => {
        const matchesCat = filterCategory === "all" || e.category === filterCategory;
        const matchesQuery =
            !searchQuery ||
            e.issue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.root_cause?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.resolution?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
    });

    return (
        <div className="space-y-6 mt-6">
            <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-3">
                        <BookOpen className="text-cyan-400 w-7 h-7" />
                        AI Agent Knowledge Repository
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Automatically cataloged issues, root cause diagnoses, and validated resolutions.
                    </p>
                </div>

                {/* Filter & Search Controls */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter knowledge..."
                            className="bg-slate-950/80 text-xs text-slate-200 placeholder:text-slate-600 rounded-xl pl-9 pr-3 py-2 outline-none border border-slate-800 focus:border-cyan-500/50"
                        />
                    </div>
                </div>
            </div>

            {/* Category Filter Pills */}
            {categories.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border capitalize transition-all ${
                                filterCategory === cat
                                    ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 font-semibold"
                                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Knowledge Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEntries.length === 0 ? (
                    <div className="col-span-2 glass-card rounded-2xl p-12 text-center text-slate-500 text-xs font-mono">
                        No knowledge base entries matching search filter.
                    </div>
                ) : (
                    filteredEntries.map((entry, index) => (
                        <div key={index} className="glass-card rounded-2xl p-6 space-y-4 border-slate-800/80">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                                    {entry.category}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                    <CheckCircle size={12} className="text-emerald-400" /> Verified Solution
                                </span>
                            </div>

                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Issue Description</p>
                                <p className="text-sm font-semibold text-slate-100 mt-1 font-sans">{entry.issue}</p>
                            </div>

                            {entry.root_cause && (
                                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                                    <p className="font-semibold text-amber-400 mb-0.5 font-mono text-[10px] uppercase">Root Cause</p>
                                    <p>{entry.root_cause}</p>
                                </div>
                            )}

                            {entry.resolution && (
                                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200">
                                    <p className="font-semibold text-emerald-400 mb-1 font-mono text-[10px] uppercase flex items-center gap-1">
                                        <Sparkles size={12} /> AI Resolution
                                    </p>
                                    <p className="whitespace-pre-wrap">{entry.resolution}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}