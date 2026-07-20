from fastapi import APIRouter

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get("/me")
def get_current_user():
    return {
        "message": "Users API is working"
    }