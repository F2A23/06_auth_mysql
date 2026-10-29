import {
  Space_Grotesk,
  IBM_Plex_Sans_Thai,
  JetBrains_Mono,
} from "next/font/google";
import Link from "next/link";
import "./style.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = IBM_Plex_Sans_Thai({
  variable: "--font-body",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "DIT205 Auth Portal — PATHOMKAN BUMRUNG (6807001)",
  description:
    "Next.js Authentication with MySQL on TiDB Cloud and Vercel by PATHOMKAN BUMRUNG (6807001)",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand-link">
              <span className="brand-mark">DIT205</span>
              <span>Cloud Auth Portal</span>
            </Link>

            <nav className="site-nav" aria-label="Main navigation">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/register" className="nav-link">
                Register
              </Link>
              <Link href="/login" className="nav-link">
                Login
              </Link>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <span className="nav-badge">ID 6807001</span>
            </nav>
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <span>
              <strong>PATHOMKAN BUMRUNG</strong> · Student ID{" "}
              <span className="mono">6807001</span>
            </span>
            <span className="mono">Next.js 16 + TiDB Cloud TLS + Vercel</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
