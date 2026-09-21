from pydantic import BaseModel
from typing import Optional, List

class Incident(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    sentiment: str
    priority: str
    churn_risk: str
    created_at: Optional[str] = None

class IncidentAlert(BaseModel):
    alerts: List[str]
    category_counts: dict
    sentiment_counts: dict
