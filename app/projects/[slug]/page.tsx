import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Kim Jaeyoon` : "Project" };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 py-8">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.25em] text-emerald-400">{title}</h2>
      {children}
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/#projects" className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-emerald-400">
        <ArrowLeft size={16} /> 프로젝트로 돌아가기
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-4xl`}>{p.icon}</div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">{p.title}</h1>
          <p className="mt-1 text-slate-400">{p.period} · {p.role}</p>
        </div>
      </div>

      {p.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition hover:bg-white/10">
              {l.kind === "github" ? <Code2 size={16} /> : <ExternalLink size={16} />} {l.label}
            </a>
          ))}
        </div>
      )}

      <Section title="개요"><p className="leading-relaxed text-slate-200">{p.overview}</p></Section>

      <Section title="사용 기술">
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{t}</span>
          ))}
        </div>
      </Section>

      <Section title="주요 기능">
        <ul className="space-y-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3 text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{f}</li>
          ))}
        </ul>
      </Section>

      {p.contributions.length > 0 && (
        <Section title="직접 해결한 문제 · 기여">
          <ul className="space-y-2">
            {p.contributions.map((c) => (
              <li key={c} className="flex gap-3 text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />{c}</li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
