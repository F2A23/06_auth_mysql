import Link from "next/link";

// หน้าแรก: แสดงข้อมูลนักศึกษาและลิงก์ไปยังทุกหน้าในโปรเจกต์
export default function Home() {
  return (
    <div className="home-stack">
      <section className="hero-grid">
        <div className="hero-panel">
          <div>
            <span className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              DIT205 · TiDB Cloud TLS Connected
            </span>
            <h1 className="hero-title">Auth Demo on Vercel</h1>
            <p className="hero-lead">
              ระบบสมัครสมาชิกและยืนยันตัวตนด้วย Next.js, รหัสผ่านเข้ารหัสด้วย{" "}
              <span className="mono">bcrypt</span>, จัดการเซสชันผ่าน{" "}
              <span className="mono">JWT httpOnly Cookie</span>{" "}
              และเชื่อมต่อฐานข้อมูล MySQL บน TiDB Cloud
            </p>
          </div>

          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary">
              Create Account
            </Link>
            <Link href="/login" className="btn btn-secondary">
              Sign In
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Member Dashboard
            </Link>
          </div>
        </div>

        {/* บัตรประจำตัวนักศึกษาผู้จัดทำ (แสดงชื่อ-นามสกุล และรหัสนักศึกษาชัดเจนในหน้าแรก) */}
        <aside className="id-card" aria-label="Student information">
          <div className="id-card-top">
            <span className="id-card-tag">Student Credential</span>
            <span className="id-card-chip">DIT205</span>
          </div>

          <div className="id-card-body">
            <div>
              <div className="id-field-label">Full Name / ชื่อ-นามสกุล</div>
              <div className="id-student-name">PATHOMKAN BUMRUNG</div>
            </div>

            <div className="id-meta-row">
              <div>
                <div className="id-field-label">Student ID / รหัสนักศึกษา</div>
                <div className="id-student-code">6807001</div>
              </div>
              <div>
                <div className="id-field-label">Deployment</div>
                <div className="id-meta-val">Vercel + TiDB</div>
              </div>
            </div>
          </div>

          <div className="id-mrz" aria-hidden="true">
            IDTHA6807001&lt;&lt;BUMRUNG&lt;&lt;PATHOMKAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;
            <br />
            DIT205&lt;&lt;NEXTJS16&lt;&lt;TIDBCLOUD&lt;&lt;VERCEL&lt;&lt;&lt;&lt;
          </div>
        </aside>
      </section>

      <section className="route-grid" aria-label="Application pages">
        <Link href="/register" className="route-card">
          <div>
            <span className="route-path">/register</span>
            <h2>Register</h2>
            <p>
              สมัครสมาชิกใหม่ เข้ารหัสรหัสผ่านด้วย bcrypt และบันทึกลงฐานข้อมูล
              TiDB Cloud
            </p>
          </div>
          <span className="route-cta">Open Register &rarr;</span>
        </Link>

        <Link href="/login" className="route-card">
          <div>
            <span className="route-path">/login</span>
            <h2>Login</h2>
            <p>
              ตรวจสอบอีเมลและรหัสผ่าน พร้อมออกโทเคน JWT เก็บใน httpOnly Cookie
            </p>
          </div>
          <span className="route-cta">Open Login &rarr;</span>
        </Link>

        <Link href="/dashboard" className="route-card">
          <div>
            <span className="route-path">/dashboard</span>
            <h2>Dashboard (Members Only)</h2>
            <p>
              พื้นที่เฉพาะสมาชิก ป้องกันเส้นทางด้วย proxy.js และดึงข้อมูลผู้ใช้จาก
              /api/me
            </p>
          </div>
          <span className="route-cta">Open Dashboard &rarr;</span>
        </Link>
      </section>
    </div>
  );
}
