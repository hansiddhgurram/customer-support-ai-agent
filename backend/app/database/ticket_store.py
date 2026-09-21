import chromadb

from backend.app.database.embeddings import (
    generate_embedding
)


client = chromadb.PersistentClient(
    path="./chroma_db"
)


collection = client.get_or_create_collection(
    name="support_tickets"
)


def add_ticket(
    ticket_id: str,
    text: str
):

    embedding = generate_embedding(text)

    collection.add(

        ids=[ticket_id],

        documents=[text],

        embeddings=[embedding]
    )


def search_similar_tickets(
    query: str,
    n_results: int = 3
):

    embedding = generate_embedding(query)

    results = collection.query(

        query_embeddings=[embedding],

        n_results=n_results
    )

    return results["documents"][0]