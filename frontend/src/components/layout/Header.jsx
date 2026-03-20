import useAppStore from "../../store/appStore"

export default function Header() {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode, tickets } = useAppStore()

  return (
    <header className="glass relative z-20"
      style={{ borderBottom: "1px solid rgba(34,211,238,0.1)",
        padding: "0 2rem", height: "4.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div className="animate-glow" style={{
          width: 36, height: 36, borderRadius: "0.625rem",
          background: "linear-gradient(135deg, #22d3ee, #14b8a6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem" }}>
          ⚡
        </div>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800,
          fontSize: "1.15rem", color: "var(--accent-cyan)", letterSpacing: "0.02em" }}>
          TriageAI
        </span>
      </div>

      {/* Tabs */}
      <nav className="glass" style={{ borderRadius: "0.875rem", padding: "0.3rem",
        display: "flex", alignItems: "center", gap: "0.375rem" }}>
        {[
          { id: "submit",  label: "Submit Ticket" },
          { id: "history", label: `History${tickets.length > 0 ? ` (${tickets.length})` : ""}` },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.45rem 1.25rem",
              borderRadius: "0.625rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              fontFamily: "Outfit, sans-serif",
              cursor: "pointer",
              transition: "all 0.2s",
              background: activeTab === tab.id
                ? "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(20,184,166,0.2))"
                : "transparent",
              color: activeTab === tab.id ? "var(--accent-cyan)" : "var(--text-muted)",
              border: activeTab === tab.id
                ? "1px solid rgba(34,211,238,0.3)"
                : "1px solid transparent",
            }}>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Dark mode button */}
      <button onClick={toggleDarkMode} className="glass glass-hover"
        style={{
          padding: "0.5rem 1.125rem",
          borderRadius: "0.75rem",
          fontSize: "0.85rem",
          fontWeight: 500,
          fontFamily: "Outfit, sans-serif",
          color: "var(--text-muted)",
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  )
}