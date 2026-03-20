import { useState, useEffect } from "react"
import useAppStore from "../store/appStore"

export function useHistory() {
  const tickets = useAppStore((s) => s.tickets)
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState("All")
  const [urgency,  setUrgency]  = useState("All")
  const [search,   setSearch]   = useState("")

  useEffect(() => {
    let result = [...tickets]
    if (category !== "All") result = result.filter(t => t.category === category)
    if (urgency  !== "All") result = result.filter(t => t.urgency  === urgency)
    if (search)             result = result.filter(t =>
      t.summary?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [tickets, category, urgency, search])

  return {
    tickets: filtered,
    total: tickets.length,
    category, setCategory,
    urgency,  setUrgency,
    search,   setSearch,
  }
}