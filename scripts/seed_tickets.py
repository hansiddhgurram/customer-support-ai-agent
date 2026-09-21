from backend.app.database.ticket_store import (
    add_ticket
)


sample_tickets = [

    (
        "1",
        "Payment failed during checkout using Visa card."
    ),

    (
        "2",
        "Unable to login after password reset."
    ),

    (
        "3",
        "Refund has not arrived after 7 days."
    ),

    (
        "4",
        "Application crashes during startup."
    ),

    (
        "5",
        "Double payment charged accidentally."
    )
]


for ticket_id, text in sample_tickets:

    add_ticket(ticket_id, text)


print("Sample tickets added.")