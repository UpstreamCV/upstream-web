import type { Metadata } from "next";
import Image from "next/image";

import {
  capabilities,
  contact,
  contractingProfile,
  engagementPrinciples,
  experienceCases,
  navigation,
  workPackages,
} from "./content";
import "./gov.css";
import { SiteBackdrop } from "./site-backdrop";

export const metadata: Metadata = {
  title: "Government Systems / Upstream",
  description:
    "A Boulder-based small business delivering focused government work packages across mission software, data platforms, computer vision, edge systems, and system reliability.",
  alternates: {
    canonical: "/gov",
  },
  openGraph: {
    type: "website",
    url: "/gov",
    title: "Upstream Government Systems",
    description:
      "Focused software, data, AI, and deployed-system work for government programs.",
    images: [
      {
        url: "/assets/upstream-gov-social-card.png",
        width: 1200,
        height: 630,
        alt: "Upstream Government Systems.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upstream Government Systems",
    description:
      "Focused software, data, AI, and deployed-system work for government programs.",
    images: [
      {
        url: "/assets/upstream-gov-social-card.png",
        width: 1200,
        height: 630,
        alt: "Upstream Government Systems.",
        type: "image/png",
      },
    ],
  },
};

const supportAreas = [
  { number: "01", label: "Sensors + devices", detail: "Physical interface" },
  { number: "02", label: "Edge + cloud", detail: "Reliable compute" },
  { number: "03", label: "Data + AI", detail: "Mission logic" },
  { number: "04", label: "Applications", detail: "Operational use" },
] as const;

const proofPoints = [
  "25 pilot locations",
  "Camera → edge → cloud systems",
  "Federal health data experience",
] as const;

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="Upstream government home">
      <Image
        className="brand-mark"
        src="/assets/UpstreamFish.png"
        alt=""
        width={585}
        height={845}
        priority={!footer}
        unoptimized
      />
      <span className="brand-copy">
        <span className="brand-name">Upstream</span>
        <span className="brand-context">Government systems</span>
      </span>
    </a>
  );
}

function Arrow() {
  return (
    <span className="button-arrow" aria-hidden="true">
      →
    </span>
  );
}

export default function GovernmentPage() {
  return (
    <div className="gov-root">
      <SiteBackdrop />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header" id="top">
        <div className="shell header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-header desktop-cta" href="#contact">
            Discuss a Work Package
            <Arrow />
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <div className="mobile-nav-panel">
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a className="button button-primary" href="#contact">
                Discuss a Work Package
                <Arrow />
              </a>
            </div>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />

          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Technical subcontracting partner
              </p>
              <h1 id="hero-title">
                Software, data, AI, and deployed systems for government missions.
              </h1>
              <p className="hero-summary">
                Upstream turns difficult technical gaps into fieldable,
                maintainable components for larger government programs.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Discuss a Work Package
                  <Arrow />
                </a>
                <a
                  className="button button-secondary"
                  href="/assets/upstream_capability_statement.pdf"
                  download="upstream_capability_statement.pdf"
                >
                  Download Capability Statement
                  <Arrow />
                </a>
                <a className="button button-secondary" href="#capabilities">
                  Explore Capabilities
                  <Arrow />
                </a>
              </div>
            </div>

            <div
              className="system-visual"
              role="img"
              aria-label="Technical support options spanning sensors and devices, edge and cloud, data and AI, and operational applications; each area can stand alone or be combined in a defined work package"
            >
              <div className="diagram-heading">
                <span>Defined work package</span>
                <span className="diagram-status">
                  <span aria-hidden="true" />
                  Four focus areas
                </span>
              </div>

              <div className="pipeline">
                {supportAreas.map((area) => (
                  <div className="pipeline-stage" key={area.number}>
                    <span className="pipeline-number">{area.number}</span>
                    <strong>{area.label}</strong>
                    <span>{area.detail}</span>
                  </div>
                ))}
              </div>

              <p className="diagram-note">
                Choose one focus area or combine capabilities to fit the scope
              </p>
            </div>
          </div>

          <div className="shell hero-bottomline">
            <span>Focused technical work for larger programs</span>
            <a href="#capabilities">
              Capabilities <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <aside className="proof-bar" aria-label="Selected team proof points">
          <div className="shell">
            <ul className="proof-list">
              {proofPoints.map((proofPoint, index) => (
                <li key={proofPoint}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{proofPoint}</strong>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section
          className="section section-light"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">01 / Capabilities</p>
                <h2 id="capabilities-title">Technical depth across the system.</h2>
              </div>
              <p>
                Upstream helps prime contractors and public-sector teams deliver
                focused technical work across the software, data, infrastructure,
                and physical interfaces a mission system depends on.
              </p>
            </div>

            <div className="capability-list">
              {capabilities.map((capability) => (
                <article className="capability-row" key={capability.number}>
                  <span className="capability-number">{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <span className="capability-interface">
                    {capability.interface}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section experience"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="shell experience-layout">
            <div className="experience-heading">
              <p className="section-index">02 / Team experience</p>
              <h2 id="experience-title">
                Experience that crosses system boundaries.
              </h2>
            </div>
            <div className="experience-copy">
              <p className="experience-note">
                Team-member experience, not a claim of Upstream corporate past
                performance.
              </p>
            </div>
          </div>

          <div
            className="shell experience-cases"
            aria-label="Selected team experience"
          >
            {experienceCases.map((experience) => (
              <article className="experience-case" key={experience.number}>
                <span className="experience-case-number">
                  {experience.number}
                </span>
                <h3>{experience.title}</h3>
                <strong>{experience.signal}</strong>
                <p>{experience.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section work-packages"
          id="work-packages"
          aria-labelledby="work-packages-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">03 / Work packages</p>
                <h2 id="work-packages-title">
                  Focused technical work, ready to hand off.
                </h2>
              </div>
              <p>
                Four practical starting points for prime contractors with a
                bounded backlog item, a known technical gap, or a prototype that
                needs focused engineering attention. Most fit within a 2–6 week
                delivery window.
              </p>
            </div>

            <div className="work-package-list">
              {workPackages.map((workPackage) => (
                <article className="work-package-row" key={workPackage.number}>
                  <div className="work-package-heading">
                    <span className="work-package-number">
                      {workPackage.number}
                    </span>
                    <h3>{workPackage.title}</h3>
                  </div>
                  <div className="work-package-details">
                    <div className="work-package-detail">
                      <span>When it is useful</span>
                      <p>{workPackage.usefulWhen}</p>
                    </div>
                    <div className="work-package-detail">
                      <span>Example deliverables</span>
                      <ul>
                        {workPackage.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="work-package-terms">
                      <div>
                        <span>Typical timeline</span>
                        <strong>{workPackage.timeline}</strong>
                      </div>
                      <div>
                        <span>Handoff</span>
                        <strong>{workPackage.handoff}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="work-package-cta">
              <div>
                <span>Have a bounded item in mind?</span>
                <p>
                  Share the technical context, interfaces, and desired end state.
                </p>
              </div>
              <div className="work-package-cta-actions">
                <a className="button button-secondary" href="/gov/engage">
                  Explore Ways to Engage
                  <Arrow />
                </a>
                <a
                  className="button button-primary"
                  href="mailto:josh@upstreamcv.com"
                >
                  Send Us a Technical Backlog Item
                  <Arrow />
                </a>
              </div>
            </div>

            <div
              className="contract-profile"
              aria-label="Government contracting profile"
            >
              <div className="contract-profile-heading">
                <span>Contracting profile</span>
                <span>Prepared for prime subcontract support</span>
              </div>
              <div className="contract-profile-grid">
                {contractingProfile.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="section section-deep"
          id="support"
          aria-labelledby="support-title"
        >
          <div className="shell support-layout">
            <div className="support-copy">
              <p className="section-index section-index-dark">
                04 / How we support
              </p>
              <h2 id="support-title">
                A focused team inside a larger program.
              </h2>
              <p className="support-lead">
                The prime or program team retains mission and system context;
                Upstream is accountable for the selected component, its
                interfaces, and a maintainable transition.
              </p>

              <ol className="support-list">
                {engagementPrinciples.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className="program-interface"
              aria-label="Program engagement model"
            >
              <div className="diagram-heading">
                <span>Program engagement model</span>
                <span>Bounded responsibility</span>
              </div>

              <div className="engagement-flow">
                <div className="engagement-card">
                  <span className="engagement-kicker">Larger program</span>
                  <strong>Prime / program team</strong>
                  <span>System ownership and mission context</span>
                </div>

                <div className="engagement-arrow" aria-hidden="true">
                  ↓
                </div>

                <div className="engagement-card engagement-card-accent">
                  <span className="engagement-kicker">Focused partner</span>
                  <strong>Upstream work package</strong>
                  <span>Build, integration, documentation, handoff</span>
                </div>
              </div>

              <div className="engagement-tags">
                <span>Clear scope</span>
                <span>Technical checkpoints</span>
                <span>Maintainable handoff</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-grid" aria-hidden="true" />
          <div className="shell contact-layout">
            <div>
              <p className="section-index section-index-dark">05 / Contact</p>
              <h2 id="contact-title">
                Have a technical work package that may fit a focused team?
              </h2>
              <p>Let’s discuss the scope.</p>
            </div>

            <div className="contact-card">
              <div className="contact-person">
                <span>Direct contact</span>
                <strong>{contact.name}</strong>
              </div>
              <div className="contact-links">
                <a href={`mailto:${contact.email}`}>
                  <span>Email</span>
                  <strong>{contact.email}</strong>
                  <Arrow />
                </a>
                <a href={`tel:${contact.phoneHref}`}>
                  <span>Phone</span>
                  <strong>{contact.phoneDisplay}</strong>
                  <Arrow />
                </a>
              </div>
              <a
                className="button button-contact"
                href={`mailto:${contact.email}?subject=Government%20work%20package%20discussion`}
              >
                Discuss a Work Package
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div>
            <Brand footer />
            <p>Boulder, Colorado · Technical subcontracting partner.</p>
          </div>

          <nav aria-label="Footer navigation">
            <span>Navigate</span>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span>Contact</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Upstream Vision, Inc.</span>
          <span>Government systems</span>
        </div>
      </footer>
    </div>
  );
}
