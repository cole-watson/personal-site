import { EyebrowMark } from "./doodles";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <Reveal>
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">
          <EyebrowMark />
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
