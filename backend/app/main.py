from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.db.database import Base, engine
from app.models.user import User

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mission IG Follower API",
    version="1.0.0",
)

# Register API Routers
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Mission IG Follower API is running successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }