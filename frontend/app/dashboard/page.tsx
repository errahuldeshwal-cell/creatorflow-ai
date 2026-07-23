"use client";

export default function DashboardPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🚀 Mission IG Follower Dashboard</h1>

      <hr />

      <h2>Welcome!</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>👤 User Information</h3>
          <p>Email : Logged In User</p>
          <p>Status : Active</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>📈 Statistics</h3>
          <p>Instagram Accounts : 0</p>
          <p>Campaigns : 0</p>
          <p>Followers Gained : 0</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>⚙️ System Status</h3>
          <p>Backend : ✅ Online</p>
          <p>Database : ✅ Connected</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>🎯 Next Module</h3>
          <p>Instagram Account Connection</p>
          <p>Coming Soon...</p>
        </div>
      </div>
    </div>
  );
}