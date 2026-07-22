import type { Metadata } from "next";
import Image from "next/image";

import { contact } from "../content";
import "../gov.css";
import { SiteBackdrop } from "../site-backdrop";
import {
  customCapabilityLine,
  deliverySteps,
  engagementNavigation,
  programFits,
  workAreas,
} from "./content";
import type { WorkArea } from "./content";
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

function WorkAreaSection({ workArea }: { workArea: WorkArea }) {
  return (
    <article className="work-area" id={`work-area-${workArea.slug}`}>
      <div className="work-area-heading">
        <span>{workArea.number}</span>
        <h3>{workArea.title}</h3>
        <p>
          <strong>Best for:</strong> {workArea.bestFor}
        </p>
      </div>

      <div className="work-area-transition" aria-label={`${workArea.transition.from} becomes ${workArea.transition.to}`}>
        <span>{workArea.transition.from}</span>
        <span aria-hidden="true">→</span>
        <strong>{workArea.transition.to}</strong>
      </div>

      <div className="work-area-body">
        <div className="work-area-deliverables">
          <span>Upstream can deliver</span>
          <ul>
            {workArea.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>

        <div className="work-area-proof">
          <div>
            <span>Example request</span>
            <p>“{workArea.example}”</p>
          </div>
          <div>
            <span>What you receive</span>
            <p>{workArea.outcome}</p>
          </div>
          <a className="button button-secondary" href="#contact">
            {workArea.ctaLabel}
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

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
                <a className="button button-secondary" href="#work-areas">
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
            <a href="#work-areas">
              View work areas <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          className="section work-areas"
          id="work-areas"
          aria-labelledby="work-areas-title"
        >
          <div className="shell">
            <div className="section-intro work-areas-intro">
              <div>
                <p className="section-index">01 / Common starting points</p>
                <h2 id="work-areas-title">What can you hand us?</h2>
              </div>
              <p>
                Start with a real technical problem. We will define the boundary,
                build the work, and leave your team with something usable.
              </p>
            </div>

            <div className="work-area-list">
              {workAreas.map((workArea) => (
                <WorkAreaSection key={workArea.slug} workArea={workArea} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="section program-fit"
          id="program-fit"
          aria-labelledby="program-fit-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">02 / Program fit</p>
                <h2 id="program-fit-title">
                  How Upstream Can Fit Into the Program
                </h2>
              </div>
              <p>Choose the smallest useful role for the work in front of you.</p>
            </div>

            <div className="program-fit-list">
              {programFits.map((fit) => (
                <article key={fit.number}>
                  <span>{fit.number}</span>
                  <h3>{fit.title}</h3>
                  <p>{fit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section delivery-process-section"
          id="delivery-process"
          aria-labelledby="delivery-process-title"
        >
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">03 / Delivery process</p>
                <h2 id="delivery-process-title">From Requirement to Delivery</h2>
              </div>
              <p>Three steps, with the boundary agreed before the build begins.</p>
            </div>

            <ol className="delivery-process-list">
              {deliverySteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section custom-scope"
          id="custom-scope"
          aria-labelledby="custom-scope-title"
        >
          <div className="custom-scope-grid" aria-hidden="true" />
          <div className="shell custom-scope-inner">
            <div className="custom-scope-copy">
              <p className="section-index">04 / Custom technical scope</p>
              <h2 id="custom-scope-title">Have Something Else in Mind?</h2>
              <p>
                These work areas are common starting points, not limits on what
                Upstream can support. Bring us an existing requirement or
                technical problem, and we can shape a focused scope around it.
              </p>
            </div>

            <p className="custom-capability-line">{customCapabilityLine}</p>

            <div className="custom-scope-actions">
              <a className="button button-primary" href="#contact">
                Discuss a Requirement
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
              <p className="section-index">05 / Start a conversation</p>
              <h2 id="contact-title">Give Us a Technical Problem to Own</h2>
              <p>
                Bring us a defined backlog item, an emerging technical need, or
                a prototype concept. We will help determine a practical starting
                scope.
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
