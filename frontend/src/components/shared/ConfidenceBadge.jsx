const COLORS = {
  high:   "#4ade80",
  medium: "#fbbf24",
  low:    "#f87171",
}

export default function ConfidenceBadge({ level }) {
  const color = COLORS[level] || "#94a3b8"
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
      style={{ color, fontFamily: "Syne, sans-serif" }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
      {level} confidence
    </span>
  )
}