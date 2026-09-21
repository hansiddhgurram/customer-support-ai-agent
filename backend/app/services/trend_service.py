from collections import Counter

def detect_trends(analytics_db):

    if not analytics_db:
        return []

    category_counts = Counter(
        item["category"]
        for item in analytics_db
    )

    sentiment_counts = Counter(
        item["sentiment"]
        for item in analytics_db
    )

    trends = []

    top_category = category_counts.most_common(1)

    if top_category:

        trends.append(
            f"Most common issue category: {top_category[0][0]}"
        )

    top_sentiment = sentiment_counts.most_common(1)

    if top_sentiment:

        trends.append(
            f"Dominant sentiment: {top_sentiment[0][0]}"
        )

    high_risk = len([
        x for x in analytics_db
        if x["churn_risk"] == "HIGH"
    ])

    if high_risk > 0:

        trends.append(
            f"{high_risk} customers currently flagged as high churn risk"
        )

    critical = len([
        x for x in analytics_db
        if x["priority"] == "CRITICAL"
    ])

    if critical > 0:

        trends.append(
            f"{critical} critical incidents require immediate attention"
        )

    return trends