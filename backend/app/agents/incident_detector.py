from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def detect_incident(ticket: str, similar_tickets: list[str]) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        context = "\n".join(similar_tickets)[:800]
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
You are an IT incident detector.
Analyze the ticket and similar tickets context.
Determine if this ticket indicates a major infrastructure or system-wide incident.
Return concise analysis.
"""
            ),
            (
                "human",
                "Ticket: {ticket}\nSimilar Tickets: {context}"
            )
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket, "context": context})
        return response.content.strip()
    except Exception as e:
        print(f"[incident_detector] LLM fallback triggered: {e}")
        text = ticket.lower()
        if any(w in text for w in ["outage", "504", "500", "crash", "down", "database"]):
            return "Potential System Incident: Multiple timeout/outage indicators detected across services."
        return "No systemic incident pattern detected from current ticket stream."