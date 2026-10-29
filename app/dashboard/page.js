"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // โหลดข้อมูลผู้ใช้ที่ Login อยู่จาก API
  useEffect(() => {
    fetch("/api/me")
      .then((response) => {
        if (!response.ok) {
          window.location.href = "/login";
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) setUser(data);
      });
  }, []);

  // ให้เซิร์ฟเวอร์ลบ cookie แล้วไปหน้า login
  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login"; // โหลดหน้าใหม่ ล้างหน้า Dashboard ที่ cache ไว้
  };

  if (!user) {
    return (
      <div className="dashboard-stage">
        <div className="pass-card">
          <div className="pass-strip">
            <span className="pass-strip-label">Member Pass</span>
            <span className="mono">/dashboard</span>
          </div>
          <div className="pass-body">
            <p className="mono">Loading member profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const initial = user.fullname ? user.fullname.trim().charAt(0).toUpperCase() : "M";

  return (
    <div className="dashboard-stage">
      <div className="pass-card">
        <div className="pass-strip">
          <span className="pass-strip-label">Protected Member Area</span>
          <span className="verified-pill">
            <span className="status-dot" aria-hidden="true" />
            JWT Verified
          </span>
        </div>

        <div className="pass-body">
          <div className="member-banner">
            <div className="member-avatar" aria-hidden="true">
              {initial}
            </div>
            <div>
              <h1>Welcome, {user.fullname}</h1>
              <p className="field-hint">
                เข้าสู่ระบบสำเร็จ — ข้อมูลดึงสดจากฐานข้อมูล TiDB Cloud
              </p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <div className="profile-item-label">Full Name</div>
              <div className="profile-item-value">{user.fullname}</div>
            </div>

            <div className="profile-item">
              <div className="profile-item-label">Email Address</div>
              <div className="profile-item-value">{user.email}</div>
            </div>

            <div className="profile-item">
              <div className="profile-item-label">Member ID</div>
              <div className="profile-item-value mono">#{user.id}</div>
            </div>

            <div className="profile-item">
              <div className="profile-item-label">Session Guard</div>
              <div className="profile-item-value mono">httpOnly + proxy.js</div>
            </div>
          </div>

          <div className="dashboard-actions">
            <Link href="/" className="btn btn-secondary">
              &larr; Back to Home
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-danger"
              disabled={loggingOut}
            >
              {loggingOut ? "Signing out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
