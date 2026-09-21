import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "app.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
    )
    """)
    
    # Insert default admin user if not present
    cursor.execute("SELECT username FROM users WHERE username = ?", ("admin",))
    if not cursor.fetchone():
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", ("admin", "SupportAI#2026!Admin"))

    # Analyzed Tickets table (per-user)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        username TEXT DEFAULT 'admin',
        subject TEXT,
        description TEXT,
        category TEXT,
        sentiment TEXT,
        priority TEXT,
        churn_risk TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Migration check for username column in tickets
    cursor.execute("PRAGMA table_info(tickets)")
    columns = [row[1] for row in cursor.fetchall()]
    if "username" not in columns:
        cursor.execute("ALTER TABLE tickets ADD COLUMN username TEXT DEFAULT 'admin'")

    # Knowledge Base table (per-user)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS knowledge_base (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT DEFAULT 'admin',
        category TEXT,
        issue TEXT,
        root_cause TEXT,
        resolution TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Migration check for username column in knowledge_base
    cursor.execute("PRAGMA table_info(knowledge_base)")
    columns = [row[1] for row in cursor.fetchall()]
    if "username" not in columns:
        cursor.execute("ALTER TABLE knowledge_base ADD COLUMN username TEXT DEFAULT 'admin'")

    # User Preferences table (per-user)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS preferences (
        username TEXT PRIMARY KEY,
        critical_alerts INTEGER DEFAULT 1,
        churn_alerts INTEGER DEFAULT 1
    )
    """)
    
    conn.commit()
    conn.close()

# Initialize tables on import
init_db()
