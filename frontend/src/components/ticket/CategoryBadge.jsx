const STYLES = {
  Refund:   { bg: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "rgba(167,139,250,0.3)" },
  Login:    { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa", border: "rgba(96,165,250,0.3)"  },
  Delivery: { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24", border: "rgba(251,191,36,0.3)"  },
  Billing:  { bg: "rgba(251,113,133,0.15)", color: "#fb7185", border: "rgba(251,113,133,0.3)" },
  Account:  { bg: "rgba(34,211,238,0.15)",  color: "#22d3ee", border: "rgba(34,211,238,0.3)"  },
  Other:    { bg: "rgba(148,163,184,0.15)", color: "#94a3b8", border: "rgba(148,163,184,0.3)" },
}

export default function CategoryBadge({ category }) {
  const s = STYLES[category] || STYLES.Other
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "Syne, sans-serif" }}>
      {category}
    </span>
  )
}