import { useState } from "react";
import { analyzeTicket as analyzeTicketAPI } from "../services/api";
import {
    Sparkles,
    Send,
    Bot,
    ShieldAlert,
    Cpu,
    CheckCircle2,
    Database,
    Zap,
    Users,
    Clock,
    FileText,
    ArrowRight
} from "lucide-react";

const SAMPLE_PRESETS = [
    {
        label: "Billing Issue",
        subject: "Charged twice for annual renewal subscription",
        description: "I noticed two charges of $199 on my credit card statement for my annual plan renewal. Only one transaction should have been processed. Please refund the duplicate charge immediately."
    },
    {
        label: "Database Outage",
        subject: "Database connection timeouts during checkout spike",
        description: "Our API servers started reporting 504 Gateway Timeouts and database pool exhaustion during our flash sale peak. Customers are unable to complete payment."
    },
    {
        label: "Login Bug",
        subject: "Unable to log in after requested password reset",
        description: "I reset my password via email link, but when trying to log in with new credentials, the app returns 'Invalid Token' error. Account ID: #98421."
    }
];

export default function TicketAnalysisWorkspace() {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [kbNotification, setKbNotification] = useState(false);

    const handleAnalyze = async () => {
        if (!subject.trim() || !description.trim()) return;
        try {
            setLoading(true);
            setErrorMsg("");
            setKbNotification(false);
            const data = await analyzeTicketAPI({
                subject,
                description
            });
            if (data && (data.category || data.suggested_response)) {
                setResult(data);
                setKbNotification(true);
            } else if (data && data.detail) {
                setErrorMsg(typeof data.detail === "string" ? data.detail : "Analysis failed.");
            } else {
                setErrorMsg("Received unexpected response from server.");
            }
        } catch (error) {
            console.error(error);
            const status = error.response?.status;
            if (status === 401) {
                setErrorMsg("Session expired or missing authentication token. Please log in again.");
            } else {
                setErrorMsg(error.response?.data?.detail || "Failed to analyze ticket. Please check backend connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    const applyPreset = (preset) => {
        setSubject(preset.subject);
        setDescription(preset.description);
    };

    return (
        <div className="space-y-8 mt-6">
            {/* Input Workspace Card */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-3">
                            <Bot className="text-cyan-400 w-7 h-7" />
                            Multi-Agent Ticket Intelligence Workspace
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Input a raw customer ticket to run through LLM classification, sentiment detection, root-cause analysis, and vector RAG retrieval.
                        </p>
                    </div>

                    {/* Quick Presets */}
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 mr-1">Sample Presets:</span>
                        {SAMPLE_PRESETS.map((preset, idx) => (
                            <button
                                key={idx}
                                onClick={() => applyPreset(preset)}
                                className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all font-medium"
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                            Ticket Subject
                        </label>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Payment failed during checkout with HTTP 500 error..."
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all font-sans"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                            Full Ticket Description & Context
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="Provide full customer text, error codes, logs, or system details..."
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all font-sans"
                        />
                    </div>

                    {errorMsg && (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2 font-mono">
                            <ShieldAlert size={16} />
                            {errorMsg}
                        </div>
                    )}

                    {kbNotification && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between font-mono animate-fade-in">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} /> Ticket processed successfully & inserted into Knowledge Base!
                            </span>
                            <span className="text-[11px] text-cyan-400 font-normal">Auto-Expanded KB ✓</span>
                        </div>
                    )}

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !subject.trim() || !description.trim()}
                            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 font-outfit"
                        >
                            {loading ? (
                                <>
                                    <Sparkles className="w-5 h-5 animate-spin" />
                                    Executing Multi-Agent Pipeline...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Analyze Ticket
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Analysis Output Section */}
            {result && (
                <div className="space-y-6 animate-fade-in">
                    {/* Top Multi-Agent Diagnostic Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <AgentMetricCard
                            title="Category"
                            value={result.category}
                            icon={Bot}
                            color="text-cyan-400 border-cyan-500/20 bg-cyan-500/10"
                        />
                        <AgentMetricCard
                            title="Sentiment"
                            value={result.sentiment}
                            icon={Cpu}
                            color={result.sentiment === "Angry" ? "text-rose-400 border-rose-500/20 bg-rose-500/10" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}
                        />
                        <AgentMetricCard
                            title="Priority Level"
                            value={result.priority}
                            icon={ShieldAlert}
                            color={result.priority === "CRITICAL" ? "text-rose-400 border-rose-500/20 bg-rose-500/10" : "text-amber-400 border-amber-500/20 bg-amber-500/10"}
                        />
                        <AgentMetricCard
                            title="Churn Risk"
                            value={result.churn_risk}
                            icon={Users}
                            color={result.churn_risk === "HIGH" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}
                        />
                    </div>

                    {/* Root Cause & Suggested Response Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Root Cause Card */}
                        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-amber-500">
                            <h3 className="text-lg font-bold text-white mb-3 font-outfit flex items-center gap-2">
                                <Zap className="text-amber-400 w-5 h-5" />
                                Root Cause Diagnosis
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                                {result.root_cause}
                            </p>
                        </div>

                        {/* Suggested AI Response */}
                        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-emerald-500">
                            <h3 className="text-lg font-bold text-white mb-3 font-outfit flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="text-emerald-400 w-5 h-5" />
                                    Automated Agent Draft
                                </span>
                                <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                    Ready to Send
                                </span>
                            </h3>
                            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans">
                                {result.suggested_response}
                            </div>
                        </div>
                    </div>

                    {/* SLA & Escalation Details */}
                    {result.escalation && (
                        <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-cyan-500/20">
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white font-outfit">SLA & Routing Policy</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Assigned to <span className="text-cyan-300 font-semibold">{result.escalation.team || result.escalation_team}</span> | Target SLA: <span className="text-emerald-400 font-semibold">{result.escalation.sla || "2 hours"}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Severity: {result.escalation.severity || "P2"}</span>
                                <span className={`px-4 py-2 rounded-xl text-xs font-bold ${result.escalation.escalate ? "bg-rose-500/10 text-rose-400 border border-rose-500/30" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"}`}>
                                    {result.escalation.escalate ? "Immediate Escalation Required" : "Standard Queue Handling"}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* RAG Vector Search Historical Tickets */}
                    {result.similar_tickets && result.similar_tickets.length > 0 && (
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 font-outfit flex items-center gap-2">
                                <Database className="text-indigo-400 w-5 h-5" />
                                RAG Context: Similar Historical Resolved Tickets
                            </h3>
                            <div className="space-y-3">
                                {result.similar_tickets.map((tText, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                                        <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                        <p className="leading-relaxed font-sans">{tText}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function AgentMetricCard({ title, value, icon: Icon, color }) {
    return (
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    {title}
                </p>
                <h4 className="text-xl font-bold text-white mt-1.5 font-outfit">
                    {value || "N/A"}
                </h4>
            </div>
            <div className={`p-3 rounded-xl border ${color}`}>
                <Icon size={22} />
            </div>
        </div>
    );
}