from fastapi import APIRouter, Header, Depends
from typing import Optional
from backend.app.services.semantic_cluster_service import get_semantic_clusters
from backend.app.services.token_service import verify_token

router = APIRouter()

def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/semantic-clusters")
def semantic_clusters(username: Optional[str] = Depends(get_optional_username)):
    return get_semantic_clusters(username=username)