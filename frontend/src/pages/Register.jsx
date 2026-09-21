import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Bot, Lock, User, UserPlus, ArrowLeft } from "lucide-react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        try {
            setLoading(true);
            setMessage("");
            const res = await registerUser(username, password);
            if (res.message) {
                setMessage("Account created successfully! Redirecting to login...");
                setIsSuccess(true);
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(res.error || "Registration failed");
                setIsSuccess(false);
            }
        } catch (err) {
            setMessage("Failed to register. Please check server.");
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden p-4">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

            <div className="glass-card rounded-3xl p-8 md:p-10 w-full max-w-md relative z-10 border border-slate-800/80 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/25 glow-cyan">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white font-outfit tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                        Register new administrator or support agent credentials
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Choose a username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                            <input
                                type="password"
                                placeholder="Choose a strong password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-xl text-xs font-medium border ${isSuccess ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 font-outfit"
                    >
                        {loading ? "Registering..." : (
                            <>
                                <UserPlus size={18} /> Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs">
                    <Link to="/login" className="text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1 font-medium transition-colors">
                        <ArrowLeft size={14} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}