from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.profile import router as profile_router
from app.api.instagram import router as instagram_router

from app.db.database import Base, engine

from app.models.user import User
from app.models.instagram_profile import InstagramProfile


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Mission IG Follower API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://blurt-panic-tripod.ngrok-free.dev",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# API ROUTERS
# ============================================================

app.include_router(auth_router)

app.include_router(users_router)

app.include_router(profile_router)

app.include_router(instagram_router)


# ============================================================
# INSTAGRAM OAUTH CALLBACK
# ============================================================
#
# Instagram Business Login redirects to:
#
# /auth/instagram/callback
#
# This route forwards the authorization code
# to the existing Instagram router.
#
# ============================================================

@app.get("/auth/instagram/callback")
async def instagram_callback_proxy(
    code: str | None = None,
    error: str | None = None,
):

    from fastapi.responses import RedirectResponse

    frontend_url = (
        "http://localhost:3000/auth/instagram/callback"
    )

    if error:

        return RedirectResponse(
            url=(
                f"{frontend_url}"
                f"?error={error}"
            ),
            status_code=302,
        )

    if not code:

        return RedirectResponse(
            url=(
                f"{frontend_url}"
                "?error=code_missing"
            ),
            status_code=302,
        )

    return RedirectResponse(
        url=(
            f"{frontend_url}"
            f"?code={code}"
        ),
        status_code=302,
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():

    return {
        "message":
            "Mission IG Follower API is running successfully"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }