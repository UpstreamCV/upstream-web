import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WaitlistScene } from "@/components/waitlist/WaitlistScene";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";

export const metadata = {
  title: "Request access / Upstream",
  description:
    "Bring your worst camera. Tell us what it's been hiding. We'll be in touch within 48 hours.",
};

export default function WaitlistPage() {
  return (
    <>
      <Nav />
      <WaitlistScene />
      <main className="relative z-10">
        <section className="pt-44 pb-32 md:pt-56 md:pb-48">
          <div className="shell">
            <div className="grid grid-cols-12 gap-x-8 gap-y-12">
              <div className="col-span-12 md:col-span-5">
                <p className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                  <span className="text-ink-mute">/ </span>request access
                </p>
                <div className="mt-7">
                  <KineticHeadline
                    scale="lg"
                    lines={["Bring your", "worst camera."]}
                  />
                </div>

                <p className="mt-7 max-w-[44ch] text-ink-soft" style={{ lineHeight: 1.65 }}>
                  Send us one RTSP stream that has been silently lying to
                  you. False positives nobody chases, the camera that
                  misfires every Tuesday at 3pm. We&apos;ll replay the last
                  thirty days against your rules and tell you, in
                  specifics, what you missed.
                </p>

                <ul className="mt-10 space-y-4 font-mono text-[11px] tracking-mono uppercase text-ink-mute">
                  <li className="flex items-baseline gap-3">
                    <span className="text-accent-warm">/ 01</span>
                    <span>we read every reply</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-accent-warm">/ 02</span>
                    <span>response within 48h</span>
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
