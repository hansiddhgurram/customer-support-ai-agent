from jose import jwt
from datetime import datetime,timedelta
from backend.app.config import settings

ALGORITHM = "HS256"

def create_access_token(
    username: str
):

    expire = datetime.utcnow() + timedelta(
        hours=12
    )

    payload = {
        "sub": username,
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=ALGORITHM
    )