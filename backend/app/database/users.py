from backend.app.database.sqlite_db import get_db

class UsersDB:
    def get(self, username, default=None):
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT username, password FROM users WHERE username = ?", (username,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return {"password": row["password"]}
        return default

    def __contains__(self, username):
        return self.get(username) is not None

    def __setitem__(self, username, data):
        conn = get_db()
        cursor = conn.cursor()
        password = data.get("password", "") if isinstance(data, dict) else str(data)
        cursor.execute("INSERT OR REPLACE INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()

    def __getitem__(self, username):
        res = self.get(username)
        if res is None:
            raise KeyError(username)
        return res

users_db = UsersDB()