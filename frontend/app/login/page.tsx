"use client";

import { useState } from "react";
import { login } from "@/src/services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });

      console.log("========== LOGIN RESPONSE ==========");
      console.log(response);
      console.log("====================================");

      if (!response.access_token) {
        throw new Error("access_token not received from backend");
      }

      localStorage.setItem(
        "access_token",
        response.access_token
      );

      console.log("Token Saved Successfully");
      console.log("User:", response.user);

      setMessage("✅ Login Successful");

      // Future redirect
      // window.location.href = "/dashboard";

    } catch (error: any) {
      console.error("========== LOGIN ERROR ==========");
      console.error(error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);

        setMessage(
          `❌ ${error.response.status} : ${JSON.stringify(error.response.data)}`
        );
      } else {
        console.error(error.message);
        setMessage(`❌ ${error.message}`);
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h1>Mission IG Follower</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>{message}</p>
    </div>
  );
}