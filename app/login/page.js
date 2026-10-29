"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ส่งอีเมลและรหัสผ่าน หากสำเร็จ API จะตั้ง cookie token ให้
  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // โหลดหน้าใหม่ทั้งหน้า ให้ proxy.js ตรวจ cookie ที่เพิ่งได้รับ
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message); // เช่น "Invalid email or password"
        setSubmitting(false);
      }
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-stage">
      <div className="pass-card">
        <div className="pass-strip">
          <span className="pass-strip-label">Member Verification</span>
          <span className="mono">/login</span>
        </div>

        <div className="pass-body">
          <div className="pass-header">
            <h1>Sign In</h1>
            <p>เข้าสู่ระบบเพื่อรับ JWT Session และเข้าใช้งานหน้า Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {message && (
            <p className="alert-error" role="alert">
              {message}
            </p>
          )}

          <p className="pass-footer">
            ยังไม่มีบัญชีสมาชิก?{" "}
            <Link href="/register">สมัครสมาชิกใหม่ (Create account)</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
