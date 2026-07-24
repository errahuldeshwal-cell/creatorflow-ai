from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class InstagramProfile(Base):

    __tablename__ = "instagram_profiles"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    instagram_user_id = Column(
        String(100),
        nullable=True
    )


    instagram_username = Column(
        String(100),
        nullable=True
    )


    access_token = Column(
        String(500),
        nullable=True
    )


    followers = Column(
        Integer,
        default=0
    )


    posts = Column(
        Integer,
        default=0
    )


    engagement = Column(
        Float,
        default=0
    )


    profile_image = Column(
        String(500),
        nullable=True
    )


    connected_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )