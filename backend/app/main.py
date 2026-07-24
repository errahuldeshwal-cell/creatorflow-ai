from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.profile import router as profile_router

from app.db.database import Base, engine

# Import models so SQLAlchemy knows the tables
from app.models.user import User
from app.models.instagram_profile import InstagramProfile


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Mission IG Follower API",
    version="1.0.0",
)


# -----------------------------
# CORS Configuration
# -----------------------------

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Register API Routers
# -----------------------------

app.include_router(auth_router)

app.include_router(users_router)

app.include_router(profile_router)


# -----------------------------
# Health Check
# -----------------------------

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