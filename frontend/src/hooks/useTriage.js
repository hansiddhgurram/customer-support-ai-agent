import { useState } from "react"
import { triageTicket } from "../api/client"
import useAppStore from "../store/appStore"

export function useTriage() {
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState(null)
  const addTicket = useAppStore((s) => s.addTicket)

  const submit = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await triageTicket(formData)
      setResult(data)
      addTicket(data)
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setResult(null); setError(null) }

  return { submit, result, loading, error, reset }
}