import Image from "next/image";
import { profile } from "@/content/resume";
import { hasPublicFile } from "@/lib/public-file";
import { Reveal } from "./reveal";

const HEADSHOT = "headshot.png";
const RESUME = "resume.pdf";

export function Hero() {
  const hasPhoto = hasPublicFile(HEADSHOT);
  const hasResume = hasPublicFile(RESUME);

  return (
    <section className="grid items-center gap-12 pt-16 pb-20 sm:pt-24 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div>
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {profile.location}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            <span className="block text-accent">{profile.title}.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {profile.intro}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
            >
              Get in touch
            </a>
            {hasResume && (
              <a
                href={`/${RESUME}`}
                download="Cole-Watson-Resume.pdf"
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                Download resume
              </a>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mx-auto w-full max-w-xs md:max-w-none">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 translate-x-4 translate-y-4 rounded-t-full rounded-b-3xl bg-accent-soft"
          />
          <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl border border-line bg-surface-2">
            {hasPhoto ? (
              <Image
                src={`/${HEADSHOT}`}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={1000}
                priority
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center font-serif text-7xl text-accent">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
