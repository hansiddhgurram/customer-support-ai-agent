import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

export const triageTicket  = async (payload) => (await client.post("/api/triage",  payload)).data
export const getTickets    = async (filters) => (await client.get("/api/tickets",  { params: filters })).data
export const getStatus     = async ()        => (await client.get("/api/status")).data
export const triggerIngest = async ()        => (await client.post("/api/ingest")).data