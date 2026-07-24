from pydantic import BaseModel


class ProfileResponse(BaseModel):

    instagram_username: str | None = None

    followers: int = 0

    posts: int = 0

    engagement: float = 0

    profile_image: str | None = None


    class Config:
        from_attributes = True