from collections import Counter

incident_memory = []


def store_incident_data(ticket_data: dict):

    incident_memory.append(ticket_data)


def detect_incident_spikes():

    categories = Counter(
        t["category"]
        for t in incident_memory
    )

    sentiments = Counter(
        t["sentiment"]
        for t in incident_memory
    )

    alerts = []

    if categories.get("Billing", 0) >= 3:

        alerts.append(
            "⚠ High number of Billing complaints detected."
        )

    if sentiments.get("Angry", 0) >= 3:

        alerts.append(
            "⚠ Surge in angry customer tickets detected."
        )

    if not alerts:

        alerts.append(
            "No major incidents detected."
        )

    return {

        "alerts": alerts,

        "category_counts": dict(categories),

        "sentiment_counts": dict(sentiments)
    }