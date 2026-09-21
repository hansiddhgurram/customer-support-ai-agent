from backend.app.database.ticket_store import (

    search_similar_tickets
)


def retrieve_similar_context(ticket: str):

    return search_similar_tickets(ticket)