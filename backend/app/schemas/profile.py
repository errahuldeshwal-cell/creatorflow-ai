from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ProfileResponse(BaseModel):
    instagram_username: str | None = None
    followers: int = 0
    posts: int = 0
    engagement: float = 0
    profile_image: str | None = None

    is_connected: bool = False
    connected_at: datetime | None = None
    last_sync: datetime | None = None

    model_config = ConfigDict(from_attributes=True)