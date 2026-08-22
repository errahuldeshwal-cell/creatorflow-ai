"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/src/services/auth";

const API_URL = "http://127.0.0.1:8000";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

interface InstagramProfile {
  id: number;
  user_id: number;
  instagram_username: string;
  instagram_user_id: string | null;
  access_token: string | null;
  followers: number;
  following?: number;
  posts: number;
  engagement: number;
  profile_image: string | null;
  token_expiry: string | null;
  connected_at: string | null;
  last_sync: string | null;
  is_connected: boolean;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Access token not found.");
      }

      const response = await fetch(`${API_URL}/api/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load Instagram profile.");
      }

      const profileData = await response.json();

      setProfile(profileData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          fontSize: 20,
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 40,
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <h1>🚀 Mission IG Follower Dashboard</h1>

      {error && (
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            background: "#ffe5e5",
            color: "#b00020",
            padding: 15,
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}

      <hr />

      <h2>User Information</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{user?.full_name}</td>
          </tr>

          <tr>
            <td><strong>Username</strong></td>
            <td>{user?.username}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>{user?.email}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>
            <td>
              {user?.is_active ? "✅ Active" : "❌ Disabled"}
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Instagram Profile</h2>

      {profile && (
        <div
          style={{
            border: "1px solid #dcdcdc",
            borderRadius: 10,
            padding: 20,
            marginTop: 15,
          }}
        >
          <h3>
            {profile.is_connected
              ? "🟢 Instagram Connected"
              : "🔴 Instagram Not Connected"}
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td><strong>Username</strong></td>
                <td>{profile.instagram_username || "-"}</td>
              </tr>

              <tr>
                <td><strong>Followers</strong></td>
                <td>{profile.followers}</td>
              </tr>

              <tr>
                <td><strong>Following</strong></td>
                <td>{profile.following ?? 0}</td>
              </tr>

              <tr>
                <td><strong>Posts</strong></td>
                <td>{profile.posts}</td>
              </tr>

              <tr>
                <td><strong>Engagement</strong></td>
                <td>{profile.engagement}%</td>
              </tr>

              <tr>
                <td><strong>Connected</strong></td>
                <td>
                  {profile.connected_at
                    ? new Date(profile.connected_at).toLocaleString()
                    : "-"}
                </td>
              </tr>

              <tr>
                <td><strong>Last Sync</strong></td>
                <td>
                  {profile.last_sync
                    ? new Date(profile.last_sync).toLocaleString()
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>

          {!profile.is_connected && (
            <button
              style={{
                marginTop: 25,
                padding: "12px 25px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Connect Instagram
            </button>
          )}
        </div>
      )}

      <hr />

      <h2>Raw API Response</h2>

      <pre
        style={{
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 10,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(profile, null, 2)}
      </pre>

      <div
        style={{
          marginTop: 30,
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}