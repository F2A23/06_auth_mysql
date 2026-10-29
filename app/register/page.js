"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ส่งข้อมูลฟอร์มไปยัง API หากสำเร็จไปหน้า login
  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setMessage(data.message); // เช่น "Email already registered"
      }
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-stage">
      <div className="pass-card">
        <div className="pass-strip">
          <span className="pass-strip-label">New Member Credential</span>
          <span className="mono">/register</span>
        </div>

        <div className="pass-body">
          <div className="pass-header">
            <h1>Create Account</h1>
            <p>กรอกชื่อ-นามสกุล อีเมล และรหัสผ่านเพื่อสร้างบัญชีสมาชิกใหม่</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="field">
              <label htmlFor="register-fullname">Full name</label>
              <input
                id="register-fullname"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
                placeholder="e.g. Pathomkan Bumrung"
                autoComplete="name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <span className="field-hint">
                รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {message && (
            <p className="alert-error" role="alert">
              {message}
            </p>
          )}

          <p className="pass-footer">
            มีบัญชีสมาชิกอยู่แล้ว? <Link href="/login">เข้าสู่ระบบ (Sign in)</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
