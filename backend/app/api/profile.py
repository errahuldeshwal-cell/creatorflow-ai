from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.database import get_db
from app.models.instagram_profile import InstagramProfile
from app.models.user import User
from app.schemas.profile import ProfileResponse

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.get("/me", response_model=ProfileResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = (
        db.query(InstagramProfile)
        .filter(
            InstagramProfile.user_id == current_user.id
        )
        .first()
    )

    if profile is None:

        profile = InstagramProfile(
            user_id=current_user.id,
            instagram_user_id=None,
            instagram_username="",
            access_token=None,
            followers=0,
            posts=0,
            engagement=0,
            profile_image=None
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile