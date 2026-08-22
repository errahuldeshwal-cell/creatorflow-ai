from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    database_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    instagram_app_id: str
    instagram_app_secret: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()