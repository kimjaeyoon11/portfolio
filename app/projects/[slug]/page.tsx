import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import MetricBars from "@/components/MetricBars";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} | 김재윤 포트폴리오` : "프로젝트" };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-12 gap-y-3 border-t border-rule py-9 md:grid-cols-[10rem_1fr]">
      <h2 className="font-serif text-lg font-semibold md:pt-0.5">{title}</h2>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Dashes({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[42rem] space-y-2 leading-[1.75]">
      {items.map((t) => (
        <li key={t} className="relative pl-4 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2 before:bg-faint">{t}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-[68rem] px-5 sm:px-8">
      <div className="flex items-center justify-between py-6">
        <Link href="/" className="font-serif text-lg font-semibold">김재윤</Link>
        <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-ink">프로젝트 목록</Link>
      </div>

      <div className="pb-12 pt-10 sm:pt-16">
        <p className="flex flex-wrap gap-x-4 text-sm text-faint">
          <span>{p.period}</span>
          <span>{p.role}</span>
        </p>
        <h1 className="mt-3 font-serif text-[2.5rem] font-semibold leading-tight sm:text-[3.25rem]">{p.title}</h1>
        <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.8] text-muted">{p.tagline}</p>
        {p.links.length > 0 && (
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="underline decoration-berry/40 underline-offset-4 hover:text-berry">
                {l.label}
              </a>
            ))}
          </p>
        )}
        {p.metrics && <MetricBars metrics={p.metrics} />}
      </div>

      <Block title="개요"><p className="max-w-[42rem] leading-[1.8]">{p.overview}</p></Block>
      {p.contributions.length > 0 && <Block title="직접 해결한 문제"><Dashes items={p.contributions} /></Block>}
      <Block title="주요 기능"><Dashes items={p.features} /></Block>
      <Block title="사용 기술"><p className="max-w-[42rem] leading-[1.8] text-muted">{p.tech.join(", ")}</p></Block>

      <div className="border-t border-rule py-10">
        <Link href="/#projects" className="text-sm font-medium text-berry underline decoration-berry/30 underline-offset-4 hover:decoration-berry">
          다른 프로젝트 보기
        </Link>
      </div>
    </main>
  );
}
