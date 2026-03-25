from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    category = Column(String)
    urgency = Column(String)
    reply = Column(String)