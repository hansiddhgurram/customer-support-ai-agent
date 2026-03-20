import useAppStore from "../../store/appStore"

export default function Sidebar() {
  const { kbDocs, kbIndexed } = useAppStore()

  return (
    <aside className="glass"
      style={{
        width: "15rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem 1.75rem",
        position: "relative",
        zIndex: 10,
        borderRight: "1px solid rgba(34,211,238,0.08)",
        minHeight: "100%",
      }}>

      {/* KB Status */}
      <div>
        <p style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent-cyan)",
          marginBottom: "1rem",
        }}>
          KB Status
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.625rem",
          padding: "0.75rem 1rem",
          borderRadius: "0.875rem",
          background: kbIndexed
            ? "rgba(34,211,238,0.08)"
            : "rgba(245,158,11,0.08)",
          border: kbIndexed
            ? "1px solid rgba(34,211,238,0.2)"
            : "1px solid rgba(245,158,11,0.2)",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
            background: kbIndexed ? "#22d3ee" : "#f59e0b",
            boxShadow: kbIndexed ? "0 0 8px #22d3ee" : "0 0 8px #f59e0b",
          }} />
          <span style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: kbIndexed ? "#22d3ee" : "#f59e0b",
          }}>
            {kbIndexed ? "Indexed & ready" : "Not indexed"}
          </span>
        </div>
      </div>

      {/* KB Docs */}
      {kbDocs.length > 0 && (
        <div>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent-teal)",
            marginBottom: "1rem",
          }}>
            Documents
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {kbDocs.map((doc, i) => (
              <div key={i} className="glass glass-hover"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.875rem",
                  display: "flex", alignItems: "center", gap: "0.625rem",
                }}>
                <span style={{ color: "var(--accent-teal)", fontSize: "0.8rem" }}>📄</span>
                <span style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}