from fastapi import APIRouter, Header, Depends
from typing import Optional
from backend.app.database.analytics_store import get_all_tickets_from_db
from backend.app.services.token_service import verify_token

router = APIRouter()

def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/incidents")
def get_incidents(username: Optional[str] = Depends(get_optional_username)):
    incidents = []
    tickets = get_all_tickets_from_db(username=username)

    for item in tickets:
        prio = (item.get("priority") or "").upper()
        churn = (item.get("churn_risk") or "").upper()
        if prio in ["CRITICAL", "HIGH"] or churn == "HIGH":
            incidents.append({
                "id": item.get("id"),
                "subject": item.get("subject", "Incident Alert"),
                "category": item.get("category", "General"),
                "sentiment": item.get("sentiment", "Negative"),
                "churn_risk": item.get("churn_risk", "MEDIUM"),
                "priority": item.get("priority", "HIGH"),
                "created_at": item.get("created_at")
            })

    return incidents[:15]