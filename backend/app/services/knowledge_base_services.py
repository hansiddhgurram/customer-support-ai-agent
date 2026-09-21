from backend.app.database.sqlite_db import get_db

def store_knowledge_entry(data: dict, username: str = "admin"):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO knowledge_base (username, category, issue, root_cause, resolution)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            username or "admin",
            data.get("category", "General"),
            data.get("issue", ""),
            data.get("root_cause", ""),
            data.get("resolution", "")
        )
    )
    conn.commit()
    conn.close()

def search_knowledge_base(category=None, username=None):
    conn = get_db()
    cursor = conn.cursor()
    if username:
        if category and category != "all":
            cursor.execute("SELECT id, username, category, issue, root_cause, resolution, created_at FROM knowledge_base WHERE username = ? AND category = ? ORDER BY created_at DESC LIMIT 20", (username, category))
        else:
            cursor.execute("SELECT id, username, category, issue, root_cause, resolution, created_at FROM knowledge_base WHERE username = ? ORDER BY created_at DESC LIMIT 50", (username,))
    else:
        if category and category != "all":
            cursor.execute("SELECT id, username, category, issue, root_cause, resolution, created_at FROM knowledge_base WHERE category = ? ORDER BY created_at DESC LIMIT 20", (category,))
        else:
            cursor.execute("SELECT id, username, category, issue, root_cause, resolution, created_at FROM knowledge_base ORDER BY created_at DESC LIMIT 50")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]