from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def detect_churn_risk(ticket: str) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
Analyze customer churn risk.
Return ONLY one:
- LOW
- MEDIUM
- HIGH

No explanation. No reasoning.
"""
            ),
            ("human", "{ticket}")
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket})
        res = response.content.strip()
        if any(c in res for c in ["LOW", "MEDIUM", "HIGH"]):
            return res
    except Exception as e:
        print(f"[churn_agent] LLM fallback triggered: {e}")

    text = ticket.lower()
    if any(w in text for w in ["cancel", "unsubscribe", "refund", "close account", "switching to competitor", "terrible"]):
        return "HIGH"
    if any(w in text for w in ["unhappy", "frustrated", "delay", "issue", "charged"]):
        return "MEDIUM"
    return "LOW"