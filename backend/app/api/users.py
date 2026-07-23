from fastapi import APIRouter, Depends

from app.models.user import User
from app.core.security import get_current_user


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