"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { EASE } from "@/lib/motion";

interface Member {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
}

const TEAM: Member[] = [
  {
    name: "Elkan Bruha",
    role: "Co-Founder · CEO",
    photo: "/assets/ElkanProfile.jpeg",
    bio: "Previous Founder and Lead Engineer of CrowdCount",
    linkedin: "https://www.linkedin.com/in/elkanbruha",
  },
  {
    name: "Josh D'Annunzio",
    role: "Co-Founder · CTO",
    photo: "/assets/JoshProfile.jpeg",
    bio: "Previous Computer Vision Lead of CrowdCount, Data Analyst at RELI Group Inc.",
    linkedin: "https://www.linkedin.com/in/josh-dannunzio/",
  },
  {
    name: "Hayden Forbes",
    role: "Co-Founder · COO",
    photo: "/assets/HaydenProfile.jpeg",
    bio: "Previous Co-Founder of CrowdCount, Growth Strategist at Pure Distilling, VC associate",
    linkedin: "https://www.linkedin.com/in/hayden-forbes",
  },
];

export function AboutTeam() {
  return (
    <SectionShell
      kicker="founders"
      headline={["Three operators,", "one stack."]}
      headScale="lg"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        {TEAM.map((m, i) => (
          <motion.a
            key={m.name}
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE.outQuint, delay: i * 0.12 }}
            className="group col-span-12 md:col-span-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-glass-stroke-2">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 90vw, 30vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ filter: "saturate(0.85) contrast(1.04)" }}
              />
              {/* Soft warm wash to unify with the palette */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,20,8,0.0) 30%, rgba(13,20,8,0.65) 100%)",
                  mixBlendMode: "multiply",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-overlay opacity-30 transition-opacity duration-700 group-hover:opacity-10"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(75,129,108,0.4), transparent 60%)",
                }}
              />

              <div className="absolute inset-x-6 bottom-6">
                <div className="font-mono text-[10px] tracking-kicker uppercase text-accent-warm">
                  {m.role}
                </div>
                <div
                  className="mt-1 font-display text-ink"
                  style={{
                    fontSize: "clamp(22px, 1.8vw, 28px)",
                    fontWeight: 500,
                  }}
                >
                  {m.name}
                </div>
              </div>
            </div>

            <p className="mt-6 text-ink-soft" style={{ lineHeight: 1.65 }}>
              {m.bio}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-mono uppercase text-ink-mute transition-colors group-hover:text-ink">
              <LinkedInGlyph />
              View profile
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">↗</span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
