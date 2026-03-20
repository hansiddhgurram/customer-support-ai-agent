import TicketRow  from "./TicketRow"
import EmptyState from "../shared/EmptyState"

export default function TicketList({ tickets }) {
  if (!tickets.length) return <EmptyState message="No tickets yet — submit one from the Submit tab" />
  return (
    <div className="space-y-3">
      {tickets.map((t, i) => <TicketRow key={t.ticket_id || i} ticket={t} />)}
    </div>
  )
}