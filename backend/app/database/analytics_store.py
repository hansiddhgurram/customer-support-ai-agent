from backend.app.database.sqlite_db import get_db

def add_ticket_to_db(username: str, ticket_id: str, subject: str, description: str, category: str, sentiment: str, priority: str, churn_risk: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT OR REPLACE INTO tickets (id, username, subject, description, category, sentiment, priority, churn_risk)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (ticket_id, username or "admin", subject, description, category, sentiment, priority, churn_risk)
    )
    conn.commit()
    conn.close()

def get_all_tickets_from_db(username: str = None):
    conn = get_db()
    cursor = conn.cursor()
    if username:
        cursor.execute("SELECT id, username, subject, description, category, sentiment, priority, churn_risk, created_at FROM tickets WHERE username = ? ORDER BY created_at DESC", (username,))
    else:
        cursor.execute("SELECT id, username, subject, description, category, sentiment, priority, churn_risk, created_at FROM tickets ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Backwards-compatible dynamic property list alias
class AnalyticsDB(list):
    def __iter__(self):
        return iter(get_all_tickets_from_db())
    def __len__(self):
        return len(get_all_tickets_from_db())
    def __getitem__(self, index):
        return get_all_tickets_from_db()[index]

analytics_db = AnalyticsDB()
