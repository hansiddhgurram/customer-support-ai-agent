export default function SourceList({ sources = [] }) {
  if (!sources.length) return null
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)", fontFamily: "Syne, sans-serif" }}>
        KB Sources
      </p>
      {sources.map((s, i) => (
        <div key={i} className="glass glass-hover rounded-xl p-3 transition-all">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>
              📄 {s.document}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full glass"
              style={{ color: "var(--accent-teal)", border: "1px solid rgba(20,184,166,0.3)" }}>
              {Math.round(s.score * 100)}%
            </span>
          </div>
          <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
            "{s.snippet?.slice(0, 100)}..."
          </p>
        </div>
      ))}
    </div>
  )
}