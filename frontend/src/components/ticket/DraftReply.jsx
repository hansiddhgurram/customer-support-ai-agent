import { useState } from "react"

export default function DraftReply({ reply }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(reply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)", fontFamily: "Syne, sans-serif" }}>
          Suggested Reply
        </p>
        <button onClick={copy}
          className="text-xs px-3 py-1 rounded-lg glass glass-hover transition-all"
          style={{ color: copied ? "#4ade80" : "var(--accent-cyan)", border: "1px solid rgba(34,211,238,0.2)" }}>
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </div>
      <div className="glass rounded-xl p-4"
        style={{ borderLeft: "2px solid var(--accent-teal)" }}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{reply}</p>
      </div>
    </div>
  )
}