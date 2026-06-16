import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Act01Water } from "@/components/v2/Act01Water";
import { Act02Promise } from "@/components/v2/Act02Promise";
import { Act03Observation } from "@/components/v2/Act03Observation";
import { Act04Drift } from "@/components/v2/Act04Drift";
import { Act05Reports } from "@/components/v2/Act05Reports";
import { Act06Current } from "@/components/v2/Act06Current";

/**
 * The Confluence Sequence — six full-viewport acts that scroll like the
 * pages of an editorial film. Each act is drenched in one of the three
 * primaries (deep / mid / moss / base); the river video is fixed to the
 * viewport behind Act 01 and subsequent acts sweep over it as the page
 * scrolls.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Act01Water />
        {/* The grey/grainy/orb layer covers ONLY the middle acts — pinned over
            the fixed river, from the end of the hero to before the current
            fold. No fade. */}
        <div className="atmo-zone relative">
          <Atmosphere variant="zone" />
          <Act02Promise />
          <Act03Observation />
          <Act04Drift />
          <Act05Reports />
        </div>
        <Act06Current />
      </main>
      <Footer />
    </>
  );
}
