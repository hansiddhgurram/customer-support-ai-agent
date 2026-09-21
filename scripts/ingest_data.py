import os
import sys

# Add project root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.database.ticket_store import add_ticket

SEED_TICKETS = [
    ("t-101", "Payment processing failed during checkout with error code 500."),
    ("t-102", "Password reset link expired before I could change my password."),
    ("t-103", "Charged twice on my credit card for subscription billing."),
    ("t-104", "Database server timed out during high volume traffic peak."),
    ("t-105", "Cannot download invoice PDF from account billing dashboard."),
    ("t-106", "API response time degraded significantly over the last 2 hours."),
    ("t-107", "Requested refund 10 days ago but status still shows pending."),
    ("t-108", "Mobile app crashing repeatedly on launch screen after update.")
]

def main():
    print("Ingesting initial support dataset into ChromaDB vector store...")
    for ticket_id, text in SEED_TICKETS:
        try:
            add_ticket(ticket_id, text)
            print(f"Ingested ticket [{ticket_id}]: {text[:40]}...")
        except Exception as e:
            print(f"Failed to ingest [{ticket_id}]: {e}")
    print("Data ingestion complete.")

if __name__ == "__main__":
    main()
