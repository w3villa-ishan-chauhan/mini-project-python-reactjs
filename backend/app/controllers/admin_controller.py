from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.schema.user_response import user_response
from app.schema.new_subscription import new_subscription
from app.database import getDb
from app.models.userdb import userSchema
from typing import List


def subscription_change(email, subs_type, db: Session = Depends(getDb)):
    print("subs_type", subs_type)
    print("email", email)
    user = db.query(userSchema).filter(userSchema.email == email).first()
    print("user",user)
    user.subscription_type = subs_type
    print("subscription_type", user.subscription_type )
    db.commit()
    db.refresh(user)
    print("allokay")
    return {"subs_type": user.subscription_type, "status": 200}
