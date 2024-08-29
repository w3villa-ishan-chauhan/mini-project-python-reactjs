from pydantic import BaseModel
from typing import List, Optional


class User_Structure(BaseModel):
    id: int
    name: str
    email: str
    role: Optional[str]
    profile_image: Optional[str]
    residing_address: Optional[str]
    subscription_type: Optional[str]

    class Config:
        orm_mode = True  # Enables ORM mode


class user_response(BaseModel):
    data: List[User_Structure]
    total: int
    page: int
    size: int
