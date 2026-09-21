from fastapi import APIRouter, Depends, Header
from typing import Optional
import uuid

from backend.app.services.token_service import verify_token
from backend.app.models.ticket import Ticket

from backend.app.agents.classifier_agent import (
    classify_ticket
)

from backend.app.agents.sentiment_agent import (
    analyze_sentiment
)

from backend.app.agents.response_agent import (
    generate_response
)

from backend.app.agents.priority_agent import (
    detect_priority
)

from backend.app.agents.incident_detector import (
    detect_incident
)

from backend.app.agents.root_cause_agent import (
    analyze_root_cause
)

from backend.app.agents.churn_agent import (
    detect_churn_risk
)

from backend.app.database.ticket_store import (

    search_similar_tickets,

    add_ticket
)

from backend.app.services.analytics_service import (

    store_ticket_analytics,

    get_analytics
)

from backend.app.services.incident_monitor_service import (

    store_incident_data,

    detect_incident_spikes
)

from backend.app.services.knowledge_base_services import (

    store_knowledge_entry,

    search_knowledge_base
)

from backend.app.services.semantic_cluster_service import (

    add_to_semantic_cluster,

    get_semantic_clusters
)

from backend.app.services.escalation_service import (
    get_escalation_details
)

from backend.app.services.sla_service import (

    predict_sla_risk,

    determine_escalation
)

from backend.app.utils.logger import logger

from backend.app.models.user import User

from backend.app.services.auth_service import create_access_token
router = APIRouter()

from fastapi import Depends

from backend.app.dependencies.auth import get_current_user

from backend.app.database.users import users_db

from backend.app.models.password_change import PasswordChange

from backend.app.database.users import users_db

from backend.app.database.preferences_store import preferences

@router.post("/analyze-ticket")
def analyze_ticket(ticket: Ticket, user = Depends(get_current_user)):
    username = user.get("sub", "admin") if isinstance(user, dict) else "admin"

    logger.info(

        f"Processing ticket: {ticket.subject}"
        
    )

    full_text = f"""
Subject:
{ticket.subject}

Description:
{ticket.description}
"""

    category = classify_ticket(
        full_text
    )

    sentiment = analyze_sentiment(
        full_text
    )

    priority = detect_priority(
        full_text
    )

    churn_risk = detect_churn_risk(
        full_text
    )

    similar_tickets = search_similar_tickets(
        full_text
    )

    incident_analysis = detect_incident(

        full_text,

        similar_tickets
    )

    root_cause = analyze_root_cause(

        full_text,

        similar_tickets
    )

    response = generate_response(
        full_text
    )

    ticket_id = str(uuid.uuid4())

    add_ticket(

        ticket_id,

        full_text
    )

    cluster_id = add_to_semantic_cluster(
        full_text,
        username=username
    )

    store_ticket_analytics({

        "id": ticket_id,

        "subject": ticket.subject,

        "description": ticket.description,

        "category": category,

        "sentiment": sentiment,

        "priority": priority,

        "churn_risk": churn_risk
    }, username=username)

    store_incident_data({

        "category": category,

        "sentiment": sentiment
    })

    store_knowledge_entry({
        "category": category,
        
        "issue": full_text,
        
        "root_cause": root_cause,
        
        "resolution": response
    }, username=username)

    sla_risk = predict_sla_risk(
        
        priority,
        
        sentiment
    )

    escalation = determine_escalation(
        
        priority
        
    )

    escalation_detail = get_escalation_details(

        priority, 

        churn_risk

    )

    return {

        "category": category,

        "sentiment": sentiment,

        "priority": priority,

        "churn_risk": churn_risk,

        "similar_tickets": similar_tickets,

        "incident_analysis": incident_analysis,

        "root_cause": root_cause,

        "suggested_response": response,

        "sla_risk": sla_risk,
        
        "escalation_team": escalation,

        "escalation": escalation_detail,

        "semantic_cluster": cluster_id,
    }


def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/analytics")
def analytics(username: Optional[str] = Depends(get_optional_username)):
    return get_analytics(username=username)

@router.get("/incident-alerts")
def incident_alerts():
    return detect_incident_spikes()

@router.get("/clusters")
def clusters(username: Optional[str] = Depends(get_optional_username)):
    return get_semantic_clusters(username=username)

@router.post("/login")
def login(user: User):
    stored_user = users_db.get(user.username)
    if stored_user and stored_user["password"] == user.password:
        token = create_access_token(user.username)
        return {"token": token}
    return {"error": "Invalid credentials"}

@router.post("/google-login")
def google_login(data: dict):
    email = data.get("email") or data.get("username") or "google_user@domain.com"
    username = email.split("@")[0] if "@" in email else email
    if username not in users_db:
        users_db[username] = {"password": "GoogleOAuth#Secured2026"}
    token = create_access_token(username)
    return {"token": token, "username": username}

@router.post("/register")
def register(user: User):
    if user.username in users_db:
        return {"error": "User already exists"}
    users_db[user.username] = {"password": user.password}
    return {"message": "User created successfully"}

@router.post("/change-password")
def change_password(data: PasswordChange):
    user = users_db.get(data.username)
    if not user:
        return {"error": "User not found"}
    if user["password"] != data.current_password:
        return {"error": "Current password incorrect"}
    users_db[data.username] = {"password": data.new_password}
    return {"message": "Password updated successfully"}

@router.get("/preferences")
def get_preferences():

    return preferences


@router.post("/preferences")
def save_preferences(data: dict):

    preferences["critical_alerts"] = data.get(
        "critical_alerts",
        True
    )

    preferences["churn_alerts"] = data.get(
        "churn_alerts",
        True
    )

    return {

        "message":
        "Preferences saved"
    }