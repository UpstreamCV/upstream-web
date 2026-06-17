"use client";

/**
 * Footer — editorial 3-row block. Light, asymmetric, lots of breathing
 * room. Sits below the CTA section's dark plate.
 */

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-glass-stroke-2 bg-base-3">
      <div className="shell py-20">
        <div className="grid grid-cols-12 gap-y-12 gap-x-8">
          {/* brand block */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/assets/upstream-logo-white.png" alt="" width={40} height={40} />
              <span
                className="font-display text-2xl text-ink"
                style={{ fontWeight: 700 }}
              >
                Upstream
              </span>
            </div>
            <p className="mt-6 max-w-[42ch] text-ink-soft" style={{ lineHeight: 1.6 }}>
              Reliability-native infrastructure for live computer vision.
              Built by people who experienced the problem first hand.
            </p>
            <p className="mt-5 text-sm text-ink-soft" style={{ lineHeight: 1.6 }}>
              Questions? Email us at{" "}
              <a
                href="mailto:hello@upstreamcv.com"
                className="text-ink"
              >
                hello@upstreamcv.com
              </a>
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
              Product
            </div>
            <ul className="mt-4 space-y-2.5">
              <FooterLink href="/#act-observation">Pipeline</FooterLink>
              <FooterLink href="/#act-drift">Drift detection</FooterLink>
              <FooterLink href="/#act-reports">Field reports</FooterLink>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
              Company
            </div>
            <ul className="mt-4 space-y-2.5">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/waitlist">Waitlist</FooterLink>
              <FooterLink href="https://linkedin.com/company/upstreamcomputervision" external>
                LinkedIn
              </FooterLink>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute">
              Status
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li className="inline-flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                Building
              </li>
              <li className="font-mono text-[11px] text-ink-mute">
                Production launch · Q4 2026
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-glass-stroke-2 pt-8 font-mono text-[10px] tracking-mono uppercase text-ink-mute md:flex-row md:items-center">
          <span>© 2026 Upstream Vision, Inc.</span>
          <span>Boulder, Colorado</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block py-1 text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
      >
        {children}
      </Link>
    </li>
  );
}
