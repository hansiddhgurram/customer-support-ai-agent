import { create } from "zustand"

const useAppStore = create((set) => ({
  activeTab: "submit",
  setActiveTab: (tab) => set({ activeTab: tab }),

  darkMode: true,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  tickets: [],
  addTicket: (ticket) =>
    set((s) => ({ tickets: [ticket, ...s.tickets] })),

  kbDocs:    [],
  kbIndexed: false,
  setKbStatus: (docs, indexed) =>
    set({ kbDocs: docs, kbIndexed: indexed }),
}))

export default useAppStore