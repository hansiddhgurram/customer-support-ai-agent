from collections import Counter
from backend.app.database.analytics_store import add_ticket_to_db, get_all_tickets_from_db

def store_ticket_analytics(ticket_data: dict, username: str = "admin"):
    add_ticket_to_db(
        username=username,
        ticket_id=ticket_data.get("id", ""),
        subject=ticket_data.get("subject", ""),
        description=ticket_data.get("description", ""),
        category=ticket_data.get("category", "General"),
        sentiment=ticket_data.get("sentiment", "Neutral"),
        priority=ticket_data.get("priority", "LOW"),
        churn_risk=ticket_data.get("churn_risk", "LOW")
    )

def get_analytics(username: str = None):
    analytics_db = get_all_tickets_from_db(username=username)
    total_tickets = len(analytics_db)

    critical_count = len(
        [x for x in analytics_db if (x.get("priority") or "").upper() == "CRITICAL"]
    )

    churn_risk_count = len(
        [x for x in analytics_db if (x.get("churn_risk") or "").upper() == "HIGH"]
    )

    resolved = len(
        [x for x in analytics_db if (x.get("priority") or "").upper() != "CRITICAL"]
    )

    resolution_rate = round((resolved / total_tickets) * 100, 2) if total_tickets > 0 else 100.0

    sentiment_counter = Counter(
        x.get("sentiment", "Neutral") for x in analytics_db
    )

    category_counter = Counter(
        x.get("category", "General") for x in analytics_db
    )

    sentiment_distribution = [
        {"name": key, "value": value}
        for key, value in sentiment_counter.items()
    ]

    category_distribution = [
        {"category": key, "count": value}
        for key, value in category_counter.items()
    ]

    return {
        "total_tickets": total_tickets,
        "critical_incidents": critical_count,
        "high_churn_risk": churn_risk_count,
        "resolution_rate": resolution_rate,
        "sentiment_distribution": sentiment_distribution,
        "category_distribution": category_distribution,
        "top_categories": dict(category_counter),
        "priority_distribution": dict(Counter(x.get("priority", "LOW") for x in analytics_db)),
        "churn_distribution": dict(Counter(x.get("churn_risk", "LOW") for x in analytics_db))
    }