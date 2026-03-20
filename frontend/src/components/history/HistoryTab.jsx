import { useHistory } from "../../hooks/useHistory"
import FilterBar  from "./FilterBar"
import TicketList from "./TicketList"

export default function HistoryTab() {
  const { tickets, total, category, setCategory, urgency, setUrgency, search, setSearch } = useHistory()

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem",
          background: "linear-gradient(135deg, #22d3ee, #14b8a6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Ticket History
        </h2>
        <span className="text-xs glass px-3 py-1 rounded-full"
          style={{ color: "var(--accent-teal)", border: "1px solid rgba(20,184,166,0.2)" }}>
          {total} total
        </span>
      </div>
      <FilterBar
        category={category} setCategory={setCategory}
        urgency={urgency}   setUrgency={setUrgency}
        search={search}     setSearch={setSearch}
      />
      <TicketList tickets={tickets} />
    </div>
  )
}