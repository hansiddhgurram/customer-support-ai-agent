import { useState } from "react"
import CategoryBadge from "../ticket/CategoryBadge"
import UrgencyBadge  from "../ticket/UrgencyBadge"
import TicketResult  from "../ticket/TicketResult"

export default function TicketRow({ ticket }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all"
      style={{ border: "1px solid rgba(34,211,238,0.08)" }}>
      <div onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-all glass-hover">
        <div className="flex items-center gap-3 flex-wrap">
          <CategoryBadge category={ticket.category} />
          <UrgencyBadge  urgency={ticket.urgency}  />
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>
            {ticket.summary?.slice(0, 60)}...
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{ticket.ticket_id}</span>
          <span className="text-xs" style={{ color: "var(--accent-cyan)" }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>
      {expanded && (
        <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <TicketResult result={ticket} />
        </div>
      )}
    </div>
  )
}