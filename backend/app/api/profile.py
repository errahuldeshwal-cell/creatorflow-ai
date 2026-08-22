from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.instagram_profile import InstagramProfile
from app.models.user import User
from app.core.security import get_current_user


router = APIRouter(
    prefix="/api/profile",
    tags=["Instagram Profile"]
)


@router.get("/")
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(InstagramProfile).filter(
        InstagramProfile.user_id == current_user.id
    ).first()

    if not profile:
        profile = InstagramProfile(
            user_id=current_user.id,
            instagram_user_id=None,
            instagram_username="",
            access_token=None,
            token_expiry=None,
            followers=0,
            posts=0,
            engagement=0,
            profile_image=None,
            is_connected=False,
            connected_at=None,
            last_sync=None
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile