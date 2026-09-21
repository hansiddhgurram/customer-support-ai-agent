from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def generate_response(ticket_text: str) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
You are a professional customer support AI agent.
Draft an empathetic, clear, and action-oriented response to the customer ticket.
Keep it professional and helpful.
"""
            ),
            ("human", "{ticket}")
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket_text})
        return response.content.strip()
    except Exception as e:
        print(f"[response_agent] LLM fallback triggered: {e}")
        return "Hello,\n\nThank you for reaching out to customer support. We have received your request and our technical team is actively reviewing your issue. We apologize for any inconvenience caused and will provide an update shortly.\n\nBest regards,\nSupport Operations Team"