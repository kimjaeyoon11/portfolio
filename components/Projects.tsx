import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-700">Projects</p>
      <SplitReveal text="만든 것들" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
      <div className="mt-12 grid gap-6">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-7 transition hover:border-emerald-600/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-3xl`}>
                    {p.icon}
                  </div>
                  {p.featured && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">대표 프로젝트</span>}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-slate-600">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="rounded-md bg-slate-900/[0.05] px-2 py-1 text-xs text-slate-600">{t}</span>
                  ))}
                </div>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                자세히 보기 <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
