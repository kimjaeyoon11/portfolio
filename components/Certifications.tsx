import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const CERTS = [
  { icon: "🏆", name: "부산경제진흥원장상", note: "2026 AI 해커톤 · TripTok (4인 팀)" },
  { icon: "☁️", name: "Microsoft Azure AI-900", note: "AI Fundamentals" },
  { icon: "🚗", name: "운전면허 1종", note: "" },
];

export default function Certifications() {
  return (
    <section id="certs" className="border-y border-slate-900/10 bg-[#eef2ec] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-700">Awards · Certifications</p>
        <SplitReveal text="수상 · 자격증" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="flex items-center gap-4 rounded-2xl border border-slate-900/10 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-5">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <div className="font-medium text-slate-900">{c.name}</div>
                {c.note && <div className="text-sm text-slate-500">{c.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
