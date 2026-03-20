export default function EmptyState({ message = "Nothing here yet" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="text-4xl opacity-30">📭</div>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{message}</p>
    </div>
  )
}