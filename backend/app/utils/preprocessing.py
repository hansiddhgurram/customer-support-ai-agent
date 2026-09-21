import re
import string

def clean_text(text: str) -> str:
    """Clean and normalize raw input text for embeddings and LLM prompts."""
    if not text:
        return ""
    # Convert to lowercase
    cleaned = text.strip()
    # Normalize extra whitespace
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned

def extract_keywords(text: str) -> list[str]:
    """Extract basic keywords from ticket text by removing common stopwords."""
    stopwords = {"the", "a", "an", "is", "are", "was", "were", "and", "or", "but", "in", "on", "at", "to", "for", "with", "my", "our", "this", "that", "it"}
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    return [w for w in words if w not in stopwords]
