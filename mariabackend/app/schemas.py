from pydantic import BaseModel

class MariaTodoBase(BaseModel):
    title: str
    completed: bool = False

class MariaTodoCreate(MariaTodoBase):
    pass

class MariaTodoUpdate(MariaTodoBase):
    pass

class MariaTodoOut(MariaTodoBase):
    id: int
    class Config:
        orm_mode = True
