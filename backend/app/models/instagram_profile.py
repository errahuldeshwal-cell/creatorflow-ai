from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
    Boolean,
)
from sqlalchemy.orm import relationship
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
        nullable=False,
        unique=True
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

    token_expiry = Column(
        DateTime(timezone=True),
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

    is_connected = Column(
        Boolean,
        default=False
    )

    connected_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    last_sync = Column(
        DateTime(timezone=True),
        nullable=True
    )

    user = relationship(
        "User",
        back_populates="instagram_profile"
    )