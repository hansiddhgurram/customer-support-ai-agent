import json
from backend.app.database.sqlite_db import get_db

class PreferencesStore:
    def get(self, key, default=True):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM preferences WHERE key = ?", (key,))
        row = cursor.fetchone()
        conn.close()
        if row:
            try:
                return json.loads(row["value"])
            except Exception:
                return row["value"]
        return default

    def __setitem__(self, key, value):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("INSERT OR REPLACE INTO preferences (key, value) VALUES (?, ?)", (key, json.dumps(value)))
        conn.commit()
        conn.close()

    def __getitem__(self, key):
        return self.get(key)

preferences = PreferencesStore()