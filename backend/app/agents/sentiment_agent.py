from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from backend.app.config import settings

def analyze_sentiment(ticket_text: str) -> str:
    try:
        llm = ChatGroq(
            model="groq/compound-mini",
            api_key=settings.GROQ_API_KEY
        )
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
Analyze customer sentiment.
Return ONLY one word:
- Positive
- Neutral
- Negative
- Angry

No explanation. No reasoning.
"""
            ),
            ("human", "{ticket}")
        ])
        chain = prompt | llm
        response = chain.invoke({"ticket": ticket_text})
        res = response.content.strip()
        if any(s in res for s in ["Positive", "Neutral", "Negative", "Angry"]):
            return res
    except Exception as e:
        print(f"[sentiment_agent] LLM fallback triggered: {e}")

    text = ticket_text.lower()
    if any(w in text for w in ["immediately", "terrible", "worst", "unacceptable", "furious", "angry", "refund now"]):
        return "Angry"
    if any(w in text for w in ["issue", "problem", "fail", "error", "unable"]):
        return "Negative"
    if any(w in text for w in ["thanks", "great", "good"]):
        return "Positive"
    return "Neutral"