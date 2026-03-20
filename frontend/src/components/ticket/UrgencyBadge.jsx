const STYLES = {
  High:   { bg: "rgba(239,68,68,0.15)",   color: "#f87171", border: "rgba(239,68,68,0.3)",   dot: "#ef4444" },
  Medium: { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", border: "rgba(251,191,36,0.3)",  dot: "#f59e0b" },
  Low:    { bg: "rgba(34,197,94,0.15)",   color: "#4ade80", border: "rgba(34,197,94,0.3)",   dot: "#22c55e" },
}

export default function UrgencyBadge({ urgency }) {
  const s = STYLES[urgency] || STYLES.Low
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "Syne, sans-serif" }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot, boxShadow: `0 0 4px ${s.dot}` }} />
      {urgency}
    </span>
  )
}