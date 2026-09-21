import numpy as np
from backend.app.utils.logger import logger

_embedding_model = None

def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        try:
            from sentence_transformers import SentenceTransformer
            logger.info("Lazy-loading SentenceTransformer('all-MiniLM-L6-v2')...")
            _embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception as e:
            logger.warning(f"SentenceTransformer lazy-load skipped ({e}). Using feature-vector fallback.")
            _embedding_model = False
    return _embedding_model

def generate_embedding(text: str):
    model = get_embedding_model()
    if model:
        try:
            return model.encode(text).tolist()
        except Exception as e:
            logger.warning(f"Model encode failed: {e}. Falling back to feature vector.")
    
    # Fast 384-dimensional normalized feature vector fallback
    words = (text or "").lower().split()
    vector = np.zeros(384, dtype=np.float32)
    for w in words:
        idx = hash(w) % 384
        vector[idx] += 1.0
    norm = np.linalg.norm(vector)
    if norm > 0:
        vector = vector / norm
    return vector.tolist()