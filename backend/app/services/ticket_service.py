from app.services.llm_service import generate_response
import json
from app.db.database import SessionLocal
from app.models.ticket import Ticket

def triage_ticket(message: str):
    prompt = f"""
    You are a customer support AI.

    Analyze the ticket and return JSON with:
    - category
    - urgency
    - reply

    Ticket: {message}

    Return ONLY JSON.
    """

    response = generate_response(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "category": "General Inquiry",
            "urgency": "Medium",
            "reply": response
        }
    data = json.loads(response)
    db = SessionLocal()
    ticket = Ticket(
        message = message,
        category = data["category"],
        urgency = data["urgency"],
        reply = data["reply"]
    )
    db.add(ticket)
    db.commit()
    db.close()
    return data