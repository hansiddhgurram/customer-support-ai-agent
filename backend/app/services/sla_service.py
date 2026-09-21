def predict_sla_risk(

    priority: str,

    sentiment: str
):

    if priority == "CRITICAL":

        return "HIGH SLA BREACH RISK"

    if sentiment == "Angry":

        return "MEDIUM SLA BREACH RISK"

    return "LOW SLA BREACH RISK"


def determine_escalation(priority: str):

    if priority == "CRITICAL":

        return "Infrastructure Team"

    if priority == "HIGH":

        return "Senior Support Team"

    return "General Support Queue"