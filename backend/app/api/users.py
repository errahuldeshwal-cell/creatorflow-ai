from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import get_current_user
from app.db.database import get_db


router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)



@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {

        "id": current_user.id,

        "username": current_user.username,

        "email": current_user.email,

        "full_name": current_user.full_name,

        "is_active": current_user.is_active

    }





@router.put("/profile")
def update_profile(

    username: str | None = None,

    full_name: str | None = None,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):


    if username:

        current_user.username = username



    if full_name:

        current_user.full_name = full_name



    db.commit()

    db.refresh(current_user)



    return {


        "message": "Profile updated successfully",


        "user": {

            "id": current_user.id,

            "username": current_user.username,

            "email": current_user.email,

            "full_name": current_user.full_name,

            "is_active": current_user.is_active

        }


    }