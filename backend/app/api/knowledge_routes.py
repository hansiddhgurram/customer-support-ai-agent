from fastapi import APIRouter, Header, Depends
from typing import Optional
from backend.app.services.knowledge_base_services import search_knowledge_base
from backend.app.services.token_service import verify_token

router = APIRouter()

def get_optional_username(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        if payload and "sub" in payload:
            return payload["sub"]
    return None

@router.get("/knowledge-base")
@router.get("/knowledge-base/{category}")
def knowledge_base(category: str = None, username: Optional[str] = Depends(get_optional_username)):
    return search_knowledge_base(category=category, username=username)