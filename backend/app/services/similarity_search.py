from backend.app.database.ticket_store import (

    search_similar_tickets
)


def find_related_tickets(ticket: str):

    return search_similar_tickets(ticket)