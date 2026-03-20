export const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short",
    year: "numeric", hour: "2-digit", minute: "2-digit",
  })

export const formatScore = (score) =>
  `${Math.round(score * 100)}%`

export const truncate = (text, max = 80) =>
  text?.length > max ? text.slice(0, max) + "..." : text

export const confidenceColor = (level) => ({
  high:   "text-emerald-400",
  medium: "text-amber-400",
  low:    "text-red-400",
}[level] || "text-gray-400")

export const urgencyStyles = (urgency) => ({
  High:   { badge: "bg-red-500/20 text-red-300 border border-red-500/40",         dot: "bg-red-400"         },
  Medium: { badge: "bg-amber-500/20 text-amber-300 border border-amber-500/40",   dot: "bg-amber-400"       },
  Low:    { badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40", dot: "bg-emerald-400"  },
}[urgency])

export const categoryStyles = (category) => ({
  Refund:   "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  Login:    "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  Delivery: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Billing:  "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  Account:  "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  Other:    "bg-slate-500/20 text-slate-300 border border-slate-500/30",
}[category] || "bg-slate-500/20 text-slate-300")