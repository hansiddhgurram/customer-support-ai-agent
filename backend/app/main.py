from fastapi import FastAPI
from app.api.triage import router as triage_router
from app.db.database import Base, engine
from app.models.ticket import Ticket

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(triage_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Backend running"}