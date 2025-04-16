from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class MariaTodo(Base):
    __tablename__ = "mariatodo"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
