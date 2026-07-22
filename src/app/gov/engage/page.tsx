import type { Metadata } from "next";
import Image from "next/image";

import { contact } from "../content";
import "../gov.css";
import { SiteBackdrop } from "../site-backdrop";
import {
  customCapabilities,
  engagementModels,
  engagementNavigation,
  readyWorkPackages,
} from "./content";
import "./engage.css";

export const metadata: Metadata = {
  title: "Ways to Engage Upstream / Government Systems",
  description:
    "Engage Upstream through focused work packages, specialized subcontract support, rapid prototypes, technical discovery, and custom government delivery.",
  alternates: {
    canonical: "/gov/engage",
  },
  openGraph: {
    type: "website",
    url: "/gov/engage",
    title: "Ways to Engage Upstream",
    description:
      "Focused technical work packages and specialized delivery support for government agencies, prime contractors, and technical teams.",
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
    title: "Ways to Engage Upstream",
    description:
      "Focused technical work packages and specialized delivery support for government programs.",
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
              <h1 id="hero-title">Ways to Engage Upstream</h1>
              <p className="hero-summary">
                Upstream supports government agencies, prime contractors, and
                technical teams through focused work packages, specialized
                subcontract support, rapid prototypes, and custom technical
                delivery. We can own a defined effort or contribute within a
                larger program.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Discuss a Requirement
                  <Arrow />
                </a>
                <a className="button button-secondary" href="#work-packages">
                  View Work Packages
                  <Arrow direction="down" />
                </a>
              </div>
            </div>

            <div
              className="engagement-map"
              role="img"
              aria-label="Government agencies, prime contractors, and technical teams can engage Upstream for a defined work package, specialized support, or rapid technical delivery"
            >
              <div className="diagram-heading">
                <span>Flexible delivery role</span>
                <span className="diagram-status">
                  <span aria-hidden="true" />
                  Scope ready
                </span>
              </div>

              <div className="engagement-map-body">
                <div className="engagement-map-sources" aria-hidden="true">
                  <span>Agency</span>
                  <span>Prime</span>
                  <span>Technical team</span>
                </div>
                <div className="engagement-map-current" aria-hidden="true">
                  <span />
                  <strong>Upstream</strong>
                  <small>Focused technical ownership</small>
                </div>
                <div className="engagement-map-outcomes" aria-hidden="true">
                  <span>Work package</span>
                  <span>Specialist support</span>
                  <span>Prototype or pilot</span>
                </div>
              </div>

              <p className="diagram-note">
                One bounded outcome, clear interfaces, maintainable handoff
              </p>
            </div>
          </div>

          <div className="shell hero-bottomline">
            <span>Join an existing program or own a defined effort</span>
            <a href="#engagement-models">
              Engagement models <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <aside className="engage-signal-bar" aria-label="Engagement summary">
          <div className="shell engage-signal-list">
            <p>Take ownership</p>
            <span aria-hidden="true" />
            <p>Add technical depth</p>
            <span aria-hidden="true" />
            <p>Clear delivery capacity</p>
          </div>
        </aside>

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
                  Several ways into the work. One accountable technical team.
                </h2>
              </div>
              <p>
                Start with the role the program needs. Upstream can work as a
                bounded subcontractor, add specialist depth to an existing team,
                or turn an uncertain concept into a scope that can move forward.
              </p>
            </div>

            <div className="engagement-model-list">
              {engagementModels.map((model) => (
                <article className="engagement-model" key={model.number}>
                  <span className="engagement-model-number">
                    {model.number}
                  </span>
                  <div className="engagement-model-copy">
                    <h3>{model.title}</h3>
                    <p>{model.summary}</p>
                  </div>
                  <ul aria-label={`${model.title} examples`}>
                    {model.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
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
                  Work packages built around a concrete outcome.
                </h2>
              </div>
              <p>
                These are representative starting points for focused,
                short-duration technical efforts. Each can be adjusted for the
                customer environment, contract, mission, security needs, and
                delivery constraints.
              </p>
            </div>

            <div className="ready-package-list">
              {readyWorkPackages.map((workPackage) => (
                <article className="ready-package" key={workPackage.number}>
                  <div className="ready-package-heading">
                    <span>{workPackage.number}</span>
                    <h3>{workPackage.title}</h3>
                  </div>

                  <div className="ready-package-focus">
                    <span>Possible focus</span>
                    <ul>
                      {workPackage.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ready-package-engagement">
                    <span>Typical engagement</span>
                    <p>“{workPackage.engagement}”</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="package-flex-note">
              <span>Representative, not restrictive</span>
              <p>
                A package can stand alone, combine with another package, or be
                reshaped around an existing statement of work. Scope and
                delivery structure are defined with the customer or prime.
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
                The packages above are useful starting points, not the limits of
                Upstream’s capabilities. Bring us the system context, technical
                constraint, or outcome that needs an owner. We can help define
                the right boundary and delivery path.
              </p>
              <a className="button button-primary" href="#contact">
                Discuss a Custom Scope
                <Arrow />
              </a>
            </div>

            <div className="custom-capability-field" aria-label="Additional technical capabilities">
              {customCapabilities.map((capability, index) => (
                <span key={capability}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {capability}
                </span>
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
                We will help identify a useful boundary for discovery, delivery,
                or a focused prototype.
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

