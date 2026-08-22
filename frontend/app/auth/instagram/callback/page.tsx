"use client";

import { useEffect, useState } from "react";

export default function InstagramLogin() {
    const [message, setMessage] = useState(
        "Ready to connect Instagram."
    );

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(
                window.location.search
            );

            const code = params.get("code");
            const error = params.get("error");

            if (!code && !error) {
                return;
            }

            if (error) {
                setMessage(
                    `Instagram authorization failed: ${error}`
                );
                return;
            }

            if (code) {
                setMessage(
                    "Instagram authorization successful. Connecting..."
                );

                try {
                    const response = await fetch(
                        "http://localhost:8000/api/instagram/exchange",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                code: code,
                            }),
                        }
                    );

                    const data = await response.json();

                    console.log(
                        "Instagram backend response:",
                        data
                    );

                    if (!response.ok) {
                        setMessage(
                            data.message ||
                                "Instagram connection failed."
                        );
                        return;
                    }

                    if (data.success) {
                        setMessage(
                            `Instagram connected successfully. User ID: ${
                                data.user_id || "N/A"
                            }`
                        );

                        window.history.replaceState(
                            {},
                            document.title,
                            window.location.pathname
                        );
                    } else {
                        setMessage(
                            data.message ||
                                "Instagram connection failed."
                        );
                    }
                } catch (error) {
                    console.error(
                        "Instagram backend error:",
                        error
                    );

                    setMessage(
                        "Could not connect to Mission IG backend."
                    );
                }
            }
        };

        handleCallback();
    }, []);

    const connectInstagram = () => {
        setMessage(
            "Opening Instagram authorization..."
        );

        const clientId = "1744126910108134";

        const redirectUri =
            "https://blurt-panic-tripod.ngrok-free.dev/auth/instagram/callback";

        const scope =
            "instagram_business_basic," +
            "instagram_business_manage_messages," +
            "instagram_business_manage_comments," +
            "instagram_business_content_publish," +
            "instagram_business_manage_insights";

        const authUrl =
            "https://www.instagram.com/oauth/authorize" +
            "?force_reauth=true" +
            `&client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(
                redirectUri
            )}` +
            "&response_type=code" +
            `&scope=${encodeURIComponent(scope)}`;

        console.log(
            "Instagram Authorization URL:",
            authUrl
        );

        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">

                <h1 className="text-3xl font-bold mb-6">
                    Mission IG Follower
                </h1>

                <p className="text-gray-400 mb-6">
                    Connect your Instagram Business or Creator account
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