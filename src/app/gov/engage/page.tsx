import type { Metadata } from "next";
import Image from "next/image";

import { contact } from "../content";
import "../gov.css";
import { SiteBackdrop } from "../site-backdrop";
import {
  customCapabilityGroups,
  engagementPaths,
  engagementNavigation,
  readyWorkPackages,
} from "./content";
import "./engage.css";

export const metadata: Metadata = {
  title: "Ways to Work With Upstream / Government Systems",
  description:
    "Give Upstream a defined government software, data, AI, edge, or deployment problem to build and deliver.",
  alternates: {
    canonical: "/gov/engage",
  },
  openGraph: {
    type: "website",
    url: "/gov/engage",
    title: "Ways to Work With Upstream",
    description:
      "Concrete technical work areas for government agencies, prime contractors, and delivery teams.",
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
    title: "Ways to Work With Upstream",
    description:
      "Concrete software, data, AI, edge, and deployment work for government programs.",
    images: ["/assets/upstream-gov-social-card.png"],
  },
};

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="/gov" aria-label="Upstream government home">
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

function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <span className="button-arrow" aria-hidden="true">
      {direction === "down" ? "↓" : "→"}
    </span>
  );
}

const emailSubject = encodeURIComponent("Government technical requirement");

export default function GovernmentEngagementPage() {
  return (
    <div className="gov-root engage-root">
      <SiteBackdrop />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header" id="top">
        <div className="shell header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {engagementNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-header desktop-cta" href="#contact">
            Discuss a Requirement
            <Arrow />
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <div className="mobile-nav-panel">
              <nav aria-label="Mobile navigation">
                {engagementNavigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a className="button button-primary" href="#contact">
                Discuss a Requirement
                <Arrow />
              </a>
            </div>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero engage-hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />

          <div className="shell engage-hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Government engagement
              </p>
              <h1 id="hero-title">Ways to Work With Upstream</h1>
              <p className="hero-summary">
                Give us a defined technical problem, backlog item, or prototype.
                We can own the work directly or contribute inside an existing
                delivery team.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Discuss a Requirement
                  <Arrow />
                </a>
                <a className="button button-secondary" href="#work-packages">
                  View Work Areas
                  <Arrow direction="down" />
                </a>
              </div>
            </div>

            <div
              className="hero-exchange"
              role="img"
              aria-label="A defined technical problem becomes working, documented delivery"
            >
              <div className="diagram-heading">
                <span>Give us the problem</span>
                <span className="diagram-status">
                  <span aria-hidden="true" />
                  Get working delivery
                </span>
              </div>

              <div className="hero-exchange-flow" aria-hidden="true">
                <div>
                  <span>Input</span>
                  <strong>Technical problem</strong>
                  <small>Requirement · backlog · prototype</small>
                </div>
                <span className="hero-exchange-arrow">→</span>
                <div>
                  <span>Output</span>
                  <strong>Working delivery</strong>
                  <small>Code · tests · documentation</small>
                </div>
              </div>
            </div>
          </div>

          <div className="shell hero-bottomline">
            <span>
              Subcontract work packages · Specialized engineering support ·
              Prototypes and pilots
            </span>
            <a href="#work-packages">
              View work areas <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          className="section engage-models"
          id="engagement-models"
          aria-labelledby="engagement-models-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">01 / Engagement models</p>
                <h2 id="engagement-models-title">
                  Choose the shape of the engagement.
                </h2>
              </div>
              <p>
                Start with what the program needs most: ownership, added depth,
                or evidence for the next decision.
              </p>
            </div>

            <div className="engagement-paths">
              {engagementPaths.map((path) => (
                <article className="engagement-path" key={path.number}>
                  <div className="engagement-path-heading">
                    <span>{path.number}</span>
                    <p>{path.signal}</p>
                  </div>
                  <div className="engagement-path-copy">
                    <h3>{path.title}</h3>
                    <p>{path.summary}</p>
                  </div>
                  <div className="engagement-path-models">
                    {path.models.map((model) => (
                      <div key={model.title}>
                        <strong>{model.title}</strong>
                        <p>{model.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section engage-packages"
          id="work-packages"
          aria-labelledby="work-packages-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">02 / Ready to scope</p>
                <h2 id="work-packages-title">
                  Six practical starting points.
                </h2>
              </div>
              <p>
                Each package starts with one concrete outcome, then adapts to the
                mission, environment, security needs, and contract.
              </p>
            </div>

            <div className="package-prompt" aria-label="Example starting points">
              <span>Bring us one</span>
              <strong>stuck workflow</strong>
              <strong>missing feature</strong>
              <strong>system connection</strong>
              <strong>unproven idea</strong>
            </div>

            <div className="ready-package-list">
              {readyWorkPackages.map((workPackage) => (
                <article className="ready-package" key={workPackage.number}>
                  <div className="ready-package-heading">
                    <span>{workPackage.number}</span>
                    <h3>{workPackage.title}</h3>
                  </div>

                  <div className="ready-package-scope">
                    <span>Scope signals</span>
                    <ul>
                      {workPackage.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ready-package-engagement">
                    <span>Defined outcome</span>
                    <p>{workPackage.outcome}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="package-flex-note">
              <span>Representative, not restrictive</span>
              <p>
                Combine packages or reshape one around an existing statement of
                work. These are conversation starters, not capability limits.
              </p>
              <a className="button button-secondary" href="#contact">
                Scope a Package
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="section custom-scope"
          id="custom-scope"
          aria-labelledby="custom-scope-title"
        >
          <div className="custom-scope-grid" aria-hidden="true" />
          <div className="shell custom-scope-layout">
            <div className="custom-scope-copy">
              <p className="section-index">03 / Custom technical scope</p>
              <h2 id="custom-scope-title">
                Have a Different Technical Requirement?
              </h2>
              <p>
                Bring us the technical constraint or outcome that needs an
                owner. We will help define the right boundary and delivery path.
              </p>
              <a className="button button-primary" href="#contact">
                Discuss a Custom Scope
                <Arrow />
              </a>
            </div>

            <div className="custom-capability-groups" aria-label="Additional technical capabilities">
              {customCapabilityGroups.map((group) => (
                <div key={group.number}>
                  <span>{group.number}</span>
                  <h3>{group.title}</h3>
                  <p>{group.capabilities}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section engage-contact"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-grid" aria-hidden="true" />
          <div className="shell contact-layout">
            <div>
              <p className="section-index">04 / Start a conversation</p>
              <h2 id="contact-title">Bring the requirement, backlog item, or technical unknown.</h2>
              <p>
                We will find a useful boundary for discovery, delivery, or a
                focused prototype.
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-person">
                <span>Direct contact</span>
                <strong>{contact.name}</strong>
              </div>
              <div className="contact-links">
                <a href={`mailto:${contact.email}?subject=${emailSubject}`}>
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
                href={`mailto:${contact.email}?subject=${emailSubject}`}
              >
                Discuss a Requirement
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
            <a href="/gov">Government home</a>
            {engagementNavigation.slice(0, 3).map((item) => (
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
