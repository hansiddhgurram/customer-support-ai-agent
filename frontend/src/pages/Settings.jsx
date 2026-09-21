import { useState } from "react";
import { changePassword as changePasswordAPI } from "../services/api";
import { Settings as SettingsIcon, Key, Bell, Shield, Server, User, Moon, Sun, CheckCircle, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [statusType, setStatusType] = useState("info");
    const [loading, setLoading] = useState(false);

    const [criticalAlerts, setCriticalAlerts] = useState(true);
    const [churnAlerts, setChurnAlerts] = useState(true);

    const handlePasswordChange = async (e) => {
        if (e) e.preventDefault();
        if (newPassword !== confirmPassword) {
            setStatusMsg("New passwords do not match.");
            setStatusType("error");
            return;
        }
        try {
            setLoading(true);
            const activeUser = localStorage.getItem("username") || "admin";
            const res = await changePasswordAPI({
                username: activeUser,
                current_password: currentPassword,
                new_password: newPassword
            });
            if (res.message) {
                setStatusMsg("Password updated successfully!");
                setStatusType("success");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setStatusMsg(res.error || "Password update failed.");
                setStatusType("error");
            }
        } catch (err) {
            setStatusMsg("Failed to update password.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 mt-6 max-w-5xl">
            <div>
                <h2 className="text-3xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-3">
                    <SettingsIcon className="text-cyan-400 w-8 h-8" />
                    Platform Settings & Configuration
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                    Manage security credentials, system alerts, theme preferences, and multi-agent model parameters.
                </p>
            </div>

            {/* Appearance Section */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                    <Sun className="text-cyan-400" size={20} />
                    <h3 className="text-lg font-bold text-white font-outfit">Interface Appearance</h3>
                </div>
                <div className="flex items-center gap-4 pt-2">
                    <button
                        onClick={() => setTheme("dark")}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                            theme === "dark"
                                ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                                : "bg-slate-900 text-slate-400 border-slate-800"
                        }`}
                    >
                        <Moon size={16} /> Dark Mode (Default)
                    </button>
                    <button
                        onClick={() => setTheme("light")}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                            theme === "light"
                                ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border-cyan-500/40"
                                : "bg-slate-900 text-slate-400 border-slate-800"
                        }`}
                    >
                        <Sun size={16} /> Light Mode
                    </button>
                </div>
            </div>

            {/* Change Password Card */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                    <Key className="text-cyan-400" size={20} />
                    <h3 className="text-lg font-bold text-white font-outfit">Security & Password Credentials</h3>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl pt-2">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password..."
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password..."
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password..."
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
                                required
                            />
                        </div>
                    </div>

                    {statusMsg && (
                        <div className={`p-3 rounded-xl text-xs font-medium border ${statusType === "success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                            {statusMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.01] transition-all font-outfit"
                    >
                        {loading ? "Updating..." : "Update Security Credentials"}
                    </button>
                </form>
            </div>

            {/* System Info & Diagnostic Badges */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                    <Server className="text-cyan-400" size={20} />
                    <h3 className="text-lg font-bold text-white font-outfit">System Environment & Diagnostics</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Platform Version</p>
                        <p className="text-cyan-400 font-bold mt-1 text-sm">v2.4.0-Production</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">LLM Intelligence Provider</p>
                        <p className="text-indigo-400 font-bold mt-1 text-sm">Groq LLaMA 3.1 8B</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Vector RAG Database</p>
                        <p className="text-emerald-400 font-bold mt-1 text-sm">ChromaDB Persisted</p>
                    </div>
                </div>
            </div>

            {/* Logout Action */}
            <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-base font-bold text-white font-outfit">Account Session</h3>
                    <p className="text-xs text-slate-400 mt-0.5">End active JWT access token session</p>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="px-5 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 font-bold text-xs font-outfit flex items-center gap-2 transition-all"
                >
                    <LogOut size={16} /> Sign Out Session
                </button>
            </div>
        </div>
    );
}