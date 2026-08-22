from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import requests

from app.core.config import settings


router = APIRouter(
    prefix="/api/instagram",
    tags=["Instagram"]
)


INSTAGRAM_APP_ID = settings.instagram_app_id
INSTAGRAM_APP_SECRET = settings.instagram_app_secret

REDIRECT_URI = (
    "https://blurt-panic-tripod.ngrok-free.dev"
    "/auth/instagram/callback"
)

FRONTEND_CALLBACK = (
    "http://localhost:3000/auth/instagram/callback"
)


class InstagramExchangeRequest(BaseModel):
    code: str


# ============================================================
# INSTAGRAM CODE EXCHANGE
# ============================================================

@router.post("/exchange")
async def instagram_exchange(
    payload: InstagramExchangeRequest
):

    code = payload.code

    print("")
    print("========================================")
    print("       INSTAGRAM CODE EXCHANGE")
    print("========================================")

    print(
        "Code received:",
        bool(code)
    )

    print(
        "Instagram App ID:",
        INSTAGRAM_APP_ID
    )

    token_payload = {
        "client_id": INSTAGRAM_APP_ID,
        "client_secret": INSTAGRAM_APP_SECRET,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI,
        "code": code,
    }

    try:

        response = requests.post(
            "https://api.instagram.com/oauth/access_token",
            data=token_payload,
            timeout=30,
        )

        print(
            "Instagram Status:",
            response.status_code
        )

        print(
            "Instagram Response:",
            response.text
        )

    except Exception as exc:

        print(
            "Instagram Request Error:",
            str(exc)
        )

        return {
            "success": False,
            "message": "Instagram token request failed.",
            "error": str(exc),
        }

    try:

        data = response.json()

    except Exception:

        return {
            "success": False,
            "message": "Invalid Instagram response.",
            "status_code": response.status_code,
            "raw_response": response.text,
        }

    if not response.ok:

        print("")
        print(
            "Instagram token exchange FAILED"
        )

        print(data)

        return {
            "success": False,
            "message": "Instagram token exchange failed.",
            "instagram_response": data,
        }

    access_token = data.get(
        "access_token"
    )

    user_id = data.get(
        "user_id"
    )

    print("")
    print("========================================")
    print("       INSTAGRAM CONNECTED")
    print("========================================")

    print(
        "User ID:",
        user_id
    )

    print(
        "Access Token received:",
        bool(access_token)
    )

    print("========================================")
    print("")

    if not access_token:

        return {
            "success": False,
            "message": "Instagram access token was not returned.",
        }

    return {
        "success": True,
        "message": "Instagram connected successfully.",
        "user_id": user_id,
        "access_token": access_token,
    }


# ============================================================
# INSTAGRAM OAUTH CALLBACK
# ============================================================

@router.get("/callback")
async def instagram_frontend_callback(
    request: Request
):

    print("")
    print("========================================")
    print("       INSTAGRAM OAUTH CALLBACK")
    print("========================================")

    code = request.query_params.get(
        "code"
    )

    error = request.query_params.get(
        "error"
    )

    error_reason = request.query_params.get(
        "error_reason"
    )

    error_description = request.query_params.get(
        "error_description"
    )

    print(
        "Code received:",
        bool(code)
    )

    print(
        "Error:",
        error
    )

    print(
        "Error reason:",
        error_reason
    )

    print(
        "Error description:",
        error_description
    )

    # --------------------------------------------------------
    # Instagram authorization error
    # --------------------------------------------------------

    if error:

        return RedirectResponse(
            url=(
                f"{FRONTEND_CALLBACK}"
                f"?error={error}"
            ),
            status_code=302,
        )

    # --------------------------------------------------------
    # No authorization code
    # --------------------------------------------------------

    if not code:

        return RedirectResponse(
            url=(
                f"{FRONTEND_CALLBACK}"
                "?error=code_missing"
            ),
            status_code=302,
        )

    # --------------------------------------------------------
    # Send authorization code to frontend
    # --------------------------------------------------------

    return RedirectResponse(
        url=(
            f"{FRONTEND_CALLBACK}"
            f"?code={code}"
        ),
        status_code=302,
    )