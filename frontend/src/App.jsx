import { useEffect } from "react"
import useAppStore from "./store/appStore"
import Header     from "./components/layout/Header"
import Sidebar    from "./components/layout/Sidebar"
import TicketTab  from "./components/ticket/TicketTab"
import HistoryTab from "./components/history/HistoryTab"
import { getStatus } from "./api/client"

export default function App() {
  const { activeTab, darkMode, setKbStatus } = useAppStore()

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.remove("light")
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
    }
  }, [darkMode])

  useEffect(() => {
    getStatus()
      .then(data => setKbStatus(data.docs, data.indexed))
      .catch(() => {})
  }, [])

  const appStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    background: darkMode ? "var(--bg-primary)" : "#f0f4ff",
    color: darkMode ? "var(--text-primary)" : "#0f172a",
  }

  return (
    <div style={appStyle}>
      <Header />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: "auto", padding: "1.5rem", position: "relative", zIndex: 10 }}>
          {activeTab === "submit"  && <TicketTab />}
          {activeTab === "history" && <HistoryTab />}
        </main>
      </div>
    </div>
  )
}