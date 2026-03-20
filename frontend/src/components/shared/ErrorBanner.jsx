export default function ErrorBanner({ message }) {
  return (
    <div className="rounded-xl px-4 py-3 text-sm"
      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
      ⚠️ {message}
    </div>
  )
}