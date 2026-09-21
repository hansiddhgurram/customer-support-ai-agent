from pydantic import BaseModel
from typing import List, Optional

class EscalationDetail(BaseModel):
    team: str
    severity: str
    sla: str
    escalate: bool

class TicketAnalysisResponse(BaseModel):
    category: str
    sentiment: str
    priority: str
    churn_risk: str
    similar_tickets: List[str]
    incident_analysis: str
    root_cause: str
    suggested_response: str
    sla_risk: str
    escalation_team: str
    escalation: EscalationDetail
    semantic_cluster: Optional[str] = None
