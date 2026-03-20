const CATEGORIES = ["All","Refund","Login","Delivery","Billing","Account","Other"]
const URGENCIES  = ["All","High","Medium","Low"]

const selectStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#94a3b8",
  borderRadius: "0.75rem",
  padding: "0.375rem 0.75rem",
  fontSize: "0.8rem",
  outline: "none",
}

export default function FilterBar({ category, setCategory, urgency, setUrgency, search, setSearch }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search tickets..."
        style={{ ...selectStyle, width: "200px", color: "var(--text-primary)" }}
      />
      <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
        {CATEGORIES.map(c => <option key={c} style={{ background: "#0d1424" }}>{c}</option>)}
      </select>
      <select value={urgency} onChange={e => setUrgency(e.target.value)} style={selectStyle}>
        {URGENCIES.map(u => <option key={u} style={{ background: "#0d1424" }}>{u}</option>)}
      </select>
    </div>
  )
}