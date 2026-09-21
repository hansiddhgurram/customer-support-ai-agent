from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def classify_ticket(ticket_text: str) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
You are a support ticket classifier.
Classify the ticket into ONE category:
- Billing
- Technical
- Account
- Refund
- Feature Request
- Bug Report
- General Inquiry

Return ONLY the category name. No explanation.
"""
            ),
            ("human", "{ticket}")
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket_text})
        res = response.content.strip()
        if any(cat in res for cat in ["Billing", "Technical", "Account", "Refund", "Feature Request", "Bug Report", "General Inquiry"]):
            return res
    except Exception as e:
        print(f"[classifier_agent] LLM fallback triggered: {e}")

    # Heuristic Fallback
    text = ticket_text.lower()
    if any(w in text for w in ["bill", "charge", "card", "invoice", "payment", "subscription", "double"]):
        return "Billing"
    if any(w in text for w in ["refund", "money back", "reimburse"]):
        return "Refund"
    if any(w in text for w in ["login", "password", "reset", "account", "token", "auth"]):
        return "Account"
    if any(w in text for w in ["crash", "error", "500", "504", "bug", "timeout", "database"]):
        return "Technical"
    return "General Inquiry"