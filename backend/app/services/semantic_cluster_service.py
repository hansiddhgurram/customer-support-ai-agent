import uuid
from backend.app.database.embeddings import generate_embedding
from sentence_transformers.util import cos_sim

# Per-user semantic cluster store: { username: { cluster_id: { "centroid": tensor, "tickets": [] } } }
user_semantic_clusters = {}
SIMILARITY_THRESHOLD = 0.70

def add_to_semantic_cluster(ticket_text, username="admin"):
    if username not in user_semantic_clusters:
        user_semantic_clusters[username] = {}
    
    clusters = user_semantic_clusters[username]
    embedding = generate_embedding(ticket_text)
    best_cluster = None
    best_score = 0

    for cluster_id, cluster_data in clusters.items():
        score = float(cos_sim(embedding, cluster_data["centroid"]))
        if score > best_score:
            best_score = score
            best_cluster = cluster_id

    if best_cluster and best_score > SIMILARITY_THRESHOLD:
        clusters[best_cluster]["tickets"].append(ticket_text)
        return best_cluster

    cluster_id = str(uuid.uuid4())[:8]
    clusters[cluster_id] = {
        "centroid": embedding,
        "tickets": [ticket_text]
    }
    return cluster_id

def get_semantic_clusters(username=None):
    if not username:
        username = "admin"
    clusters = user_semantic_clusters.get(username, {})
    result = []
    for cluster_id, cluster in clusters.items():
        result.append({
            "cluster_id": cluster_id,
            "ticket_count": len(cluster["tickets"]),
            "sample_ticket": cluster["tickets"][0]
        })
    return result