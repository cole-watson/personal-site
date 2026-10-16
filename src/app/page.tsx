import { ContactForm } from "@/components/contact-form";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { employer, profile, roles, skills } from "@/content/resume";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto max-w-5xl overflow-x-clip px-5 sm:px-8">
        <Hero />

        <Section id="about" eyebrow="About" title="A little about me">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <Reveal className="space-y-5 text-lg leading-relaxed text-pretty">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-sm font-medium text-muted">Education</p>
                <p className="mt-2 font-serif text-xl">{profile.education.school}</p>
                <p className="mt-1 text-sm">{profile.education.degree}</p>
                <p className="mt-1 text-sm text-muted">
                  {profile.education.year} · {profile.education.note}
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title={`A decade at ${employer.replace(" Inc.", "")}`}>
          <Experience employer={employer} roles={roles} />
        </Section>

        <Section id="skills" eyebrow="Skills" title="Tools of the trade">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skills.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.04}>
                <h3 className="text-sm font-medium text-muted">{g.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's talk">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <Reveal className="space-y-6">
              <p className="text-lg leading-relaxed text-muted">
                Whether it&apos;s a role, a project, or just a question, my inbox is open.
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a className="underline-offset-4 hover:text-accent hover:underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a
                    className="underline-offset-4 hover:text-accent hover:underline"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Section>
      </main>
      <footer className="mx-auto max-w-5xl border-t border-line px-5 py-10 text-sm text-muted sm:px-8">
        © {profile.name} · Built with Next.js and Tailwind
      </footer>
    </>
  );
}
