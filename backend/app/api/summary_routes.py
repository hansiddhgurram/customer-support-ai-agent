from fastapi import APIRouter, Header, Depends
from typing import Optional
from backend.app.database.analytics_store import get_all_tickets_from_db
from backend.app.agents.summarizer_agent import generate_executive_summary
from backend.app.services.token_service import verify_token

router = APIRouter()

def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/executive-summary")
def executive_summary(username: Optional[str] = Depends(get_optional_username)):
    tickets = get_all_tickets_from_db(username=username)
    if not tickets:
        return {
            "summary": "No active tickets cataloged for this account context. System ready for multi-agent ticket processing."
        }
    summary = generate_executive_summary(tickets)
    return {
        "summary": summary
    }