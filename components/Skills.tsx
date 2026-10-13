import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const GROUPS = [
  { icon: "💻", category: "Languages", items: ["Python", "TypeScript", "JavaScript", "HTML/CSS"] },
  { icon: "🎨", category: "Frontend", items: ["Next.js", "React", "Tailwind", "GSAP", "Three.js", "데이터 시각화"] },
  { icon: "👁️", category: "Vision AI", items: ["OpenCV", "MediaPipe", "YOLOv8", "ArcFace"] },
  { icon: "🤖", category: "LLM · Cloud", items: ["Anthropic Claude", "Gemini API", "Azure AI Services", "RAG", "MCP"] },
  { icon: "🔧", category: "Edge · Hardware", items: ["Raspberry Pi 5", "Hailo-8 NPU", "picamera2"] },
  { icon: "🗄️", category: "DB · Infra", items: ["PostgreSQL", "SQLite", "Supabase", "Docker", "Linux"] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-slate-900/10 bg-[#eef2ec] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-700">Skills</p>
        <SplitReveal text="사용하는 기술" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.06} className="rounded-2xl border border-slate-900/10 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{g.category}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-sm text-emerald-800">{it}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
