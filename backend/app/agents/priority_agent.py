from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def detect_priority(ticket_text: str) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
Analyze the support ticket priority.
Return ONLY one:
- LOW
- MEDIUM
- HIGH
- CRITICAL

No explanation. No reasoning.
"""
            ),
            ("human", "{ticket}")
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket_text})
        res = response.content.strip()
        if any(p in res for p in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]):
            return res
    except Exception as e:
        print(f"[priority_agent] LLM fallback triggered: {e}")

    text = ticket_text.lower()
    if any(w in text for w in ["crash", "outage", "down", "500", "504", "database timeout", "emergency"]):
        return "CRITICAL"
    if any(w in text for w in ["double charge", "charged twice", "cannot payment", "refund", "urgent"]):
        return "HIGH"
    if any(w in text for w in ["login", "reset", "password"]):
        return "MEDIUM"
    return "LOW"