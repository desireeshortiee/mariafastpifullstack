from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud
from .database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/mariatodo/", response_model=list[schemas.MariaTodoOut])
def read_mariatodos(db: Session = Depends(get_db)):
    return crud.get_all_mariatodos(db)

@app.post("/mariatodo/", response_model=schemas.MariaTodoOut)
def create(todo: schemas.MariaTodoCreate, db: Session = Depends(get_db)):
    return crud.create_mariatodo(db, todo)

@app.put("/mariatodo/{todo_id}", response_model=schemas.MariaTodoOut)
def update(todo_id: int, todo: schemas.MariaTodoUpdate, db: Session = Depends(get_db)):
    return crud.update_mariatodo(db, todo_id, todo)

@app.delete("/mariatodo/{todo_id}")
def delete(todo_id: int, db: Session = Depends(get_db)):
    crud.delete_mariatodo(db, todo_id)
    return {"detail": "Deleted"}

@app.get("/mariatodo/filter/{status}", response_model=list[schemas.MariaTodoOut])
def filter_by_status(status: str, db: Session = Depends(get_db)):
    return crud.filter_mariatodos(db, status)
