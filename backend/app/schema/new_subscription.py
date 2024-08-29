from pydantic import BaseModel

class new_subscription (BaseModel):
    subs_type:str
    email:str