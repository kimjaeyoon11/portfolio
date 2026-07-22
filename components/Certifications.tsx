import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const CERTS = [
  { icon: "☁️", name: "Microsoft Azure AI-900", note: "AI Fundamentals" },
  { icon: "🚗", name: "운전면허 1종", note: "" },
];

export default function Certifications() {
  return (
    <section id="certs" className="border-y border-white/10 bg-white/[0.02] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">Certifications</p>
        <SplitReveal text="자격증" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0f0d] p-5">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <div className="font-medium text-slate-100">{c.name}</div>
                {c.note && <div className="text-sm text-slate-400">{c.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
