import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WaitlistScene } from "@/components/waitlist/WaitlistScene";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";

export const metadata = {
  title: "Join the waitlist / Upstream",
  description:
    "Join the Upstream waitlist for the reliability layer for production computer vision. Get early access, $100 in credits, and a say in what we build.",
  openGraph: {
    title: "Join the Upstream waitlist",
    description:
      "Early access, $100 in credits, and a say in what we build. Upstream is the reliability layer for production computer vision.",
    images: ["/assets/river-splash.jpeg"],
    type: "website",
  },
};

export default function WaitlistPage() {
  return (
    <>
      <Nav />
      <WaitlistScene />
      <main className="relative">
        <section className="pt-32 pb-32 md:pt-40 md:pb-48">
          <div className="shell">
            <div className="grid grid-cols-12 gap-x-8 gap-y-12">
              <div className="col-span-12 md:col-span-5">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                  <span className="text-ink-mute">/ </span>request access
                </p>
                <div className="mt-7">
                  <KineticHeadline
                    scale="lg"
                    lines={["Join the", "waitlist."]}
                  />
                </div>

                <p className="mt-7 max-w-[44ch] text-ink-soft" style={{ lineHeight: 1.65 }}>
                  Get on the waitlist and we&apos;ll reach out the moment
                  we&apos;re ready to onboard you. We won&apos;t bug you before
                  then.
                </p>

                {/* The deal, pulled out of prose so all three perks read at a
                    glance. Nested glass sits a notch louder than the surrounding
                    copy without leaning on Signal Bright (reserved for italic
                    display accents). */}
                <div className="glass-pane is-static relative mt-9 overflow-hidden rounded-2xl p-6">
                  <p className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                    <span className="text-ink-mute">/ </span>on joining
                  </p>
                  <div className="relative mt-5 space-y-4">
                    <Perk
                      title="$100 in credits"
                      desc="On us, applied the day we onboard you."
                    />
                    <div className="h-px w-full" style={{ background: "var(--glass-stroke)" }} />
                    <Perk
                      title="Early access"
                      desc="First cohort, before we open to everyone."
                    />
                    <div className="h-px w-full" style={{ background: "var(--glass-stroke)" }} />
                    <Perk
                      title="A say in the build"
                      desc="Weigh in on design decisions while it's early."
                    />
                  </div>
                </div>

                <ul className="mt-10 space-y-4 font-mono text-[11px] tracking-mono uppercase text-ink-mute">
                  <li className="flex items-baseline gap-3">
                    <span className="text-accent-warm">/ 01</span>
                    <span>we email you at launch</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-accent-warm">/ 02</span>
                    <span>no spam until then</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-accent-warm">/ 03</span>
                    <span>onboarding through 2026</span>
                  </li>
                </ul>
              </div>

              <div className="col-span-12 md:col-span-7">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* Single perk inside the "on joining" offer card: a display-weight term
   over a soft one-line description. */
function Perk({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p
        className="font-display text-ink"
        style={{
          fontSize: "clamp(19px, 2.2vw, 26px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </p>
      <p className="mt-1.5 text-[14px] text-ink-soft" style={{ lineHeight: 1.55 }}>
        {desc}
      </p>
    </div>
  );
}
