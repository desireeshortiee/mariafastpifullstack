from sqlalchemy.orm import Session
from . import models, schemas

def get_all_mariatodos(db: Session):
    return db.query(models.MariaTodo).all()

def get_mariatodo(db: Session, id: int):
    return db.query(models.MariaTodo).filter(models.MariaTodo.id == id).first()

def create_mariatodo(db: Session, todo: schemas.MariaTodoCreate):
    db_todo = models.MariaTodo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_mariatodo(db: Session, id: int, todo: schemas.MariaTodoUpdate):
    db_todo = get_mariatodo(db, id)
    if db_todo:
        db_todo.title = todo.title
        db_todo.completed = todo.completed
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_mariatodo(db: Session, id: int):
    db_todo = get_mariatodo(db, id)
    if db_todo:
        db.delete(db_todo)
        db.commit()

def filter_mariatodos(db: Session, status: str):
    if status == "completed":
        return db.query(models.MariaTodo).filter(models.MariaTodo.completed == True).all()
    elif status == "pending":
        return db.query(models.MariaTodo).filter(models.MariaTodo.completed == False).all()
    return get_all_mariatodos(db)
