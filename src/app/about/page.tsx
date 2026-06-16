import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutContact } from "@/components/about/AboutContact";

export const metadata = {
  title: "About / Upstream",
  description:
    "Three operators building the substrate under live computer vision. Built in Boulder, Colorado.",
};

export default function AboutPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <main className="relative">
        <AboutHero />
        <AboutPhilosophy />
        <AboutTeam />
        <AboutContact />
      </main>
      <Footer />
    </>
  );
}
