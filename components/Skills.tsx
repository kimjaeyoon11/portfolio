import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const GROUPS = [
  { icon: "💻", category: "Languages", items: ["Python", "JavaScript", "TypeScript", "HTML/CSS"] },
  { icon: "🎨", category: "Frontend", items: ["Next.js", "React", "Tailwind", "GSAP", "Three.js", "데이터 시각화"] },
  { icon: "🤖", category: "AI & Cloud", items: ["Azure AI Services", "Anthropic Claude", "RAG", "MCP"] },
  { icon: "🔧", category: "Hardware", items: ["Raspberry Pi Pico", "I2S 오디오", "하드웨어 인터페이싱"] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-white/10 bg-white/[0.02] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">Skills</p>
        <SplitReveal text="사용하는 기술" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-[#0a0f0d] p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{g.category}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{it}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
