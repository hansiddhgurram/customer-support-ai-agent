from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def analyze_root_cause(ticket: str, similar_tickets: list[str]) -> str:
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
You are an expert support engineer.
Analyze the ticket and similar incidents.
Infer the MOST LIKELY technical root cause. Be concise and realistic.
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
        print(f"[root_cause_agent] LLM fallback triggered: {e}")
        text = ticket.lower()
        if "charge" in text or "bill" in text or "payment" in text:
            return "Payment Gateway Synchronization Error: Duplicate webhook dispatch or transaction state timeout."
        if "login" in text or "password" in text:
            return "Authentication Token Invalidation: Session key expired or password reset hash mismatch."
        return "Backend Service Degradation: Resource contention or API endpoint timeout."