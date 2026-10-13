import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import Section from "./Section";
import MetricBars from "./MetricBars";

export default function Projects() {
  return (
    <Section id="projects" title="만든 것">
      <div className="divide-y divide-rule">
        {PROJECTS.map((p) => (
          <article key={p.slug} className="py-10 first:pt-0 last:pb-0">
            <p className="flex flex-wrap gap-x-4 text-sm text-faint">
              <span>{p.period}</span>
              <span>{p.role}</span>
            </p>
            <h3 className="mt-2 font-serif text-[1.875rem] font-semibold leading-tight">
              <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-berry">{p.title}</Link>
            </h3>
            <p className="mt-3 max-w-[40rem] leading-[1.8] text-muted">{p.tagline}</p>

            {p.metrics && <MetricBars metrics={p.metrics} />}

            {p.featured && p.contributions.length > 0 && (
              <ul className="mt-7 max-w-[42rem] space-y-2 text-[0.9375rem] leading-[1.75]">
                {p.contributions.slice(0, 3).map((c) => (
                  <li key={c} className="relative pl-4 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2 before:bg-faint">{c}</li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-sm leading-relaxed text-faint">{p.tech.slice(0, 6).join(", ")}</p>

            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <Link href={`/projects/${p.slug}`} className="text-berry underline decoration-berry/30 underline-offset-4 hover:decoration-berry">
                자세히 보기
              </Link>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                  {l.label}
                </a>
              ))}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
