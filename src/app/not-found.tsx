import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";
import { KineticHeadline } from "@/components/atmosphere/KineticHeadline";

export const metadata = {
  title: "404 / Upstream",
  description: "Wrong URL.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative grid min-h-[80vh] place-items-center pt-40 pb-32">
        <div className="shell text-center">
          <p className="font-mono text-[10px] tracking-kicker uppercase text-ink-soft">
            <span className="text-ink-faint">/ </span>404
          </p>
          <div className="mt-8">
            <KineticHeadline
              scale="lg"
              lines={["Wrong URL."]}
              className="text-center"
            />
          </div>
          <p
            className="mx-auto mt-8 max-w-[48ch] text-ink-soft md:text-lg"
            style={{ lineHeight: 1.6 }}
          >
            The page you&apos;re looking for isn&apos;t here.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/" variant="primary">
              Back home
              <span aria-hidden="true" className="font-mono text-sm">
                →
              </span>
            </MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
