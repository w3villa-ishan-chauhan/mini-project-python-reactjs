# import user_router
# import all router and use them in main.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schema.user_response import user_response
from app.schema.new_subscription import new_subscription
from app.database import getDb
from app.models.userdb import userSchema
from typing import List
from app.controllers import admin_controller


admin_router = APIRouter()


@admin_router.get("/api/users")
def get_users(
    db: Session = Depends(getDb),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1),
    search: str = Query(None),
    role: str = Query(None),
):
    print("admin_request")
    query = db.query(userSchema)

    if search:
        query = query.filter(userSchema.email.ilike(f"%{search}%"))

    if role:
        query = query.filter(userSchema.role == role)

    total = query.count()

    users = query.offset((page - 1) * size).limit(size).all()
    return {"data": users, "total": total, "page": page, "size": size}


@admin_router.post("/api/update_subscription")
def update_subscription(
    new_subscription: new_subscription, db: Session = Depends(getDb)
):
    try:

        result = admin_controller.subscription_change(
            new_subscription.email, new_subscription.subs_type, db
        )
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
