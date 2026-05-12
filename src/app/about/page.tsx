import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/assets/upstream-logo-white.png";
const COMPANY_LINKEDIN = "https://linkedin.com/company/upstreamcomputervision";

const navLinks = [
  { href: "/#how", label: "How it works" },
  { href: "/#capabilities", label: "Platform" },
  { href: "/#use-cases", label: "Use cases" },
  { href: "/about", label: "About" },
];

const team = [
  {
    name: "Elkan Bruha",
    role: "Co-founder & Software Engineer",
    photo: "/assets/ElkanProfile.jpeg",
    linkedin: "https://www.linkedin.com/in/elkanbruha",
  },
  {
    name: "Josh D'Annunzio",
    role: "Co-founder & Software Engineer",
    photo: "/assets/JoshProfile.jpeg",
    linkedin: "https://www.linkedin.com/in/josh-d'annunzio-3b0171227/",
  },
  {
    name: "Hayden Forbes",
    role: "Business Lead",
    photo: "/assets/HaydenProfile.jpeg",
    linkedin: "https://www.linkedin.com/in/hayden-forbes",
  },
];

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <video
        className="bg-video"
        src="/assets/river.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="page">
        <nav className="top">
          <div className="nav-inner">
            <Link href="/" className="brand">
              <Image
                src={LOGO_SRC}
                alt="Upstream salmon mark"
                width={32}
                height={32}
              />
              Upstream
            </Link>
            <div className="nav-links">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="nav-cta">
              <a className="btn btn-ghost" href="/#signin">
                Sign in
              </a>
              <a className="btn btn-primary" href="/#start">
                Get ready
              </a>
            </div>
          </div>
        </nav>

        <div className="curtain">
          <section className="about-hero">
            <span className="eyebrow">About Upstream</span>
            <h1 className="display">
              Built in Boulder, by people who <em>shipped this themselves.</em>
            </h1>
            <p className="lead">
              We started Upstream after spending years building our own
              computer vision product — wrestling with RTSP ingestion, GPU
              autoscaling, tracking, and the maze of pipelines that sits
              between a live camera and a real product. We know what teams
              need, because we needed it.
            </p>
          </section>

          <section className="team-section">
            <div className="section-head">
              <div>
                <span className="section-tag">The team</span>
                <h2>
                  The people behind <em>Upstream.</em>
                </h2>
              </div>
              <p>
                A small founding team building the infrastructure we wish had
                existed when we were on the other side of the API.
              </p>
            </div>

            <div className="team-grid">
              {team.map((m) => (
                <a
                  key={m.name}
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="team-card glass"
                  aria-label={`View ${m.name}'s LinkedIn`}
                >
                  <span className="team-external" aria-hidden="true">
                    <LinkedInIcon size={16} />
                  </span>
                  <div className="team-avatar">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </a>
              ))}
            </div>

            <div className="company-link-wrap">
              <a
                className="company-link"
                href={COMPANY_LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon size={16} />
                Follow Upstream on LinkedIn
                <span className="mono" aria-hidden="true">→</span>
              </a>
            </div>
          </section>

          <footer>
            <div className="foot-inner">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image src={LOGO_SRC} alt="" width={22} height={22} />
                <span>© 2026 Upstream Labs, Inc. · Started in Boulder, CO</span>
              </div>
              <div className="foot-links">
                <a href="/#docs">Docs</a>
                <a href="/#status">Status</a>
                <a href="/#security">Security</a>
                <a href="/#careers">Careers</a>
                <Link href="/about">About</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
