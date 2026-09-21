import { useState } from "react";
import { loginUser, googleLoginUser } from "../services/api";
import { Link } from "react-router-dom";
import { Bot, Lock, User, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const res = await loginUser(username, password);
            if (res.token) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", username);
                window.location.href = "/";
            } else {
                setError(res.error || "Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const userEmail = prompt("Enter your Google Account email to authenticate via Google SSO:", "google.user@gmail.com");
        if (!userEmail) return;
        try {
            setLoading(true);
            setError("");
            const res = await googleLoginUser({ email: userEmail });
            if (res.token) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", res.username || userEmail.split("@")[0]);
                window.location.href = "/";
            } else {
                setError("Google Authentication failed");
            }
        } catch (err) {
            setError("Google login failed. Backend unreachable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden p-4 selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Ambient Background Glow Effects */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

            <div className="glass-card rounded-3xl p-8 md:p-10 w-full max-w-md relative z-10 border border-slate-800/80 shadow-2xl shadow-cyan-950/30">
                {/* Brand Logo Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/25 glow-cyan animate-float">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white font-outfit tracking-tight">
                        SupportAI <span className="gradient-text-cyan">Ops</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                        Autonomous Multi-Agent Intelligence Command Center
                    </p>
                </div>

                {/* Google OAuth SSO Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full mb-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-3 transition-all hover:bg-slate-800/60 font-outfit"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Continue with Google OAuth
                </button>

                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-slate-800"></div>
                    <span className="px-3 text-[11px] text-slate-500 font-mono uppercase">or sign in with password</span>
                    <div className="flex-1 border-t border-slate-800"></div>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Enter username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all font-sans"
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
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all font-sans"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-outfit"
                    >
                        {loading ? "Authenticating..." : (
                            <>
                                Access Platform <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Default Credentials Hint Box */}
                <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
                    <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck size={14} /> Demo Credentials
                    </p>
                    <p>Username: <span className="text-slate-200 font-semibold">admin</span></p>
                    <p>Password: <span className="text-slate-200 font-semibold">SupportAI#2026!Admin</span></p>
                </div>

                <div className="mt-6 text-center text-xs text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-cyan-400 hover:underline font-semibold">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}