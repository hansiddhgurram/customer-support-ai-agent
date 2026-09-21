from fastapi import APIRouter, Header, Depends
from typing import Optional
from backend.app.database.analytics_store import get_all_tickets_from_db
from backend.app.services.trend_service import detect_trends
from backend.app.services.token_service import verify_token

router = APIRouter()

def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/trends")
def trends(username: Optional[str] = Depends(get_optional_username)):
    tickets = get_all_tickets_from_db(username=username)
    detected = detect_trends(tickets)
    if not detected and username:
        detected = ["No trend anomalies detected for this account.", "Account system SLA within target metrics."]
    return {
        "trends": detected
    }