"use client";

import { useEffect, useState } from "react";

export default function InstagramLogin() {
    const [message, setMessage] = useState("Ready to connect Instagram.");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const success = params.get("success");
        const error = params.get("error");
        const accessToken = params.get("access_token");
        const userId = params.get("user_id");

        if (success === "true") {
            setMessage(
                `Instagram connected successfully. User ID: ${userId || "N/A"}`
            );

            console.log("Instagram Access Token:", accessToken);
            console.log("Instagram User ID:", userId);
        }

        if (error) {
            setMessage(`Instagram connection failed: ${error}`);
        }
    }, []);

    const connectInstagram = () => {
        setMessage("Opening Instagram authorization...");

        const clientId = "YOUR_INSTAGRAM_APP_ID";

        const redirectUri =
            "https://blurt-panic-tripod.ngrok-free.dev/api/instagram/callback";

        const scope =
            "instagram_business_basic,instagram_business_content_publish";

        const authUrl =
            "https://www.instagram.com/oauth/authorize" +
            `?client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent(scope)}`;

        console.log("Instagram Authorization URL:", authUrl);

        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">

                <h1 className="text-3xl font-bold mb-6">
                    Mission IG Follower
                </h1>

                <p className="text-gray-400 mb-6">
                    Connect your Instagram Business/Creator account
                </p>

                <button
                    onClick={connectInstagram}
                    className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition"
                >
                    Connect Instagram
                </button>

                {message && (
                    <p className="mt-5 text-sm text-gray-300">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}