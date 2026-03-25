from fastapi import APIRouter
from app.schemas.ticket import TicketRequest, TicketResponse
from app.services.ticket_service import triage_ticket

router = APIRouter()

@router.post("/triage", response_model=TicketResponse)
def triage(req: TicketRequest):
    return triage_ticket(req.message)