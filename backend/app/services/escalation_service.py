def determine_escalation(priority: str):

    if priority == "CRITICAL":

        return "Infrastructure Team"

    if priority == "HIGH":

        return "Senior Support Team"

    return "General Support Queue"

def get_escalation_details(
    priority,
    churn_risk
):

    if priority == "CRITICAL":

        return {
            "team": determine_escalation(priority),
            "severity": "P1",
            "sla": "30 minutes",
            "escalate": True
        }

    if churn_risk == "HIGH":

        return {
            "team": "Customer Success",
            "severity": "P2",
            "sla": "2 hours",
            "escalate": True
        }

    return {
        "team": determine_escalation(priority),
        "severity": "P3",
        "sla": "24 hours",
        "escalate": False
    }