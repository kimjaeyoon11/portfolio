import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const FACTS = [
  { icon: "🎓", label: "학력", value: "동명대학교 컴퓨터공학과" },
  { icon: "🎖️", label: "병역", value: "2024.06.04 육군 병장 만기전역 (군필)" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-700">About</p>
      <SplitReveal text="문제를 정의하고, 끝까지 구현합니다." className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
      <Reveal as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        웹 프론트엔드부터 AI 서비스 통합, 임베디드 하드웨어까지 직접 만들어 왔습니다.
        복잡한 것을 단순한 사용자 경험으로 풀어내는 데 관심이 많습니다.
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className="rounded-2xl border border-slate-900/10 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] p-5">
            <div className="text-2xl">{f.icon}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-slate-500">{f.label}</div>
            <div className="mt-1 font-medium text-slate-900">{f.value}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
